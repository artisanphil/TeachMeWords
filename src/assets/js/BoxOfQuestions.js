function BoxOfQuestions(db) {
	'use strict';

	// private variables
	var _allWordsFilteredByTag = {};

	var _question = null; // no current question
	var _wordsToPractice = null; 
	var _wordsToReview = null; // words which are eligible to be repeated.
	// initialisation to null forces calculation
	// on first call of wordsToReview()
	var _status = {};
	var _sessionExpiryTimeInSeconds = 1800;

	// private methods

	var _questionHasBeenProcessed = function(){

		_question = null;

		// This will trigger a new question, when LW.question()
		// is called the next time.

	};


	var _updateSessionInfo = function(sessionExpiryTimeInSeconds){
		// update session info in the _status object

		// _status.sessionStartDateMS
		// _status.sessionLastActivityDateMS
		// _status.sessionIsNew


		var dateTimeNow = (new Date()).valueOf();  // milliseconds




		function createNewSession() {
			_status.sessionStartDateMS = dateTimeNow;
			_status.sessionLastActivityDateMS = _status.sessionStartDateMS;
			_status.sessionStartDate = (new Date(dateTimeNow)).toJSON();
			_status.sessionLastActivityDate = _status.sessionStartDate;
			_status.sessionIsNew = true;
		}





		function dateTimeDifferenceInSeconds(dateA, dateB) {
			// calculate dateA - dateB
			return (dateA - dateB)/ 1000;
		}





		// if (sessionStartDateProperty does not exist)
		if (!_status.hasOwnProperty("sessionStartDate")) {
			// app has just started up. Thus we have no session yet.
			createNewSession();
			return _status;
		}


		// check if session is expired ; 1800 seconds;
		var previousActivityDate = _status.sessionLastActivityDateMS;
		if (dateTimeDifferenceInSeconds(dateTimeNow,previousActivityDate) > sessionExpiryTimeInSeconds) {
			createNewSession();
			return _status;
		}


		// we have an active session; just update sessionLastActivityDate
		_status.sessionLastActivityDateMS = (new Date()).valueOf();
		_status.sessionLastActivityDate = (new Date(_status.sessionLastActivityDateMS)).toJSON();
		return _status;
	};












	var _getRandomInt = function(min, max){
		// Returns a random integer between min (inclusive) and max (inclusive)
		// Using Math.round() will give you a non-uniform distribution!

    		return Math.floor(Math.random() * (max - min + 1)) + min;
	};



	var _shuffle =function(a) {
		var j, x, i;
		for (i = a.length; i; i--) {
			j = Math.floor(Math.random() * i);
			x = a[i - 1];
			a[i - 1] = a[j];
			a[j] = x;
		}
		return a;
	};








		// ===============================================================================
		// literal object
		// ===============================================================================


	return {

		version: '0.3-beta',

		db : db,

		name : db.dbName,





		chooseRandomObject : function(anArray){
			return anArray[_getRandomInt(0,anArray.length-1)];
		},




		question : function(tag, mode){
			// gives back a question to ask
			console.log("question mode: " + mode);
			if (!_question) {
				// _question is null, go for a new one.
				if(mode == "practice")
				{
					var wds = this.wordsToPractice(tag, false);
				}
				else if(mode == "practiceagain")
				{
					var wds = this.wordsToPractice(tag, true);
				}
				else
				{
					var wds = this.wordsToReview();
				}

				if (wds !== null) {_question = this.chooseRandomObject(wds);}
			}
			return _question;
		},








		answer :function(tag, mode){
			console.log("answer mode: " + mode);
			return (this.question(tag, mode)).translate;
		},






		moveQuestionBackwards : function(){
			if (_question) { // we have a question


				// set new date for asking the question again;
				// this has to be a a delay period later.

				_question.date = new Date().valueOf() + (this.db.getSettings()).delay;

				console.log("moveQuestionBackwards");
				console.log(_question);

				_question.step = 0;
				_question.point = 0;
				_question.queried = 1;

				this.db.putWord(_question);

				// As the question has a new later date it is no more
				// a current question

				_questionHasBeenProcessed();
			}
		},

		resetQueried : function(){
			var wordlist = this.db.allWords();
			for(var i=0;i<wordlist.length;i++) {
				_question = wordlist[i];
				_question.queried = 0;
				_question.point = 0;
				console.log("reset");
				this.db.putWord(_question);
			}
			_question = null;
		},

		answerWasWrong : function(){this.moveQuestionBackwards();},


		moveQuestionForward : function(){

			console.log("moveQuestionForward");

			if (_question) { // we have a question
				var s = this.db.getSettings();

				// With repeated calls to this method
				// the following will move the question up.
				//

				_question.step = _question.step + 1;
				//if already queried, we don't give anymore points
				if(_question.queried == 0)
				{
					_question.point = _question.point + 1;
				}
				if(_question.queried >= 1 && _question.point == 0)
				{
					_question.step = 0;
				}
				_question.queried = _question.queried + 1;

				// calculate new date. This depends on which step the question is.
				// And the delay calculation factor for that particular step.
				_question.date = new Date().valueOf() +
                                 s.delay * s.factorForDelayValue[_question.step];

				// The assumption is that long delay values for higher steps
				// prevent an access error for
				//     s.factorForDelayValue[stepNumber]

				console.log(_question);

				this.db.putWord(_question);

				// As the question has a new later date it is no more
				// a current question

				_questionHasBeenProcessed();


			}
		},



		answerWasCorrect : function(){this.moveQuestionForward();},



		importFrom : function(anArrayOfObjects){
			this.db.importFrom(anArrayOfObjects);
		},

		allWordsFilteredByTag : function(tag) {

			if(tag == null)
			{
				//no tag, return all words
				_allWordsFilteredByTag = this.db.allWords();
			}
			else
			{
				_allWordsFilteredByTag = this.wordsByTag(this.db.allWords(), tag);
			}

			return _allWordsFilteredByTag;
		},

		findID : function (id) {
			for(var i in _allWordsFilteredByTag){
				if(id == _allWordsFilteredByTag[i]._id)
				{
					return i;
				}
			}
		},
		getWord : function(anInteger) {

			var StorageKey = anInteger;
			try{
				var aWord = _allWordsFilteredByTag[anInteger];
				if(aWord){
					if(!aWord.hasOwnProperty("step")){
						aWord.step = _defaultInitialStepValue;
					}
					if(!aWord.date){
						aWord.date = 0;
					}
				}
				return aWord;
			}catch(e){
				console.log(e);
				return null;
			}

		},


		getLearnCards : function(tag){
			// simple implementation : choose from all available words
			// As we use ECMA5script findIndex is not available.
			// We have to duplicate the effort in keeping an array of id
			// numbers called idsOfOptions and an array of objects called
			// options.

			var n = (db.getSettings()).numberOfOptions;

			var options = [];

			if (db.numberOfWords() >= n) {

  	           var idsOfOptions = [];
				//idsOfOptions.push(q._id);

				var anOption;

				do {
					// choose option from all words.
					anOption = this.chooseRandomObject(_allWordsFilteredByTag);

					if(options.length == _allWordsFilteredByTag.length && _allWordsFilteredByTag.length < n){
						break;
					}

					//if (idsOfOptions.indexOf(anOption._id) == -1 && anOption.tags == tag) {
					if (idsOfOptions.indexOf(anOption._id) == -1) {
						// the new option is not included yet
						idsOfOptions.push(anOption._id);
						options.push(anOption);
					}

				} while (options.length < _allWordsFilteredByTag.length);

			}

			return _shuffle(options);
		},


		getAnswerOptions : function(tag, mode){
			// simple implementation : choose from all available words
			// As we use ECMA5script findIndex is not available.
			// We have to duplicate the effort in keeping an array of id
			// numbers called idsOfOptions and an array of objects called
			// options.

			var n = (db.getSettings()).numberOfOptions;

			var options = [];

			if (db.numberOfWords() >= n) {

				var q = this.question(tag, mode);
				options.push(q);

  	           var idsOfOptions = [];
				idsOfOptions.push(q._id);

				var anOption;
				// var allWords =  this.db.allWords();

				var countTries = 0;
				do {
					// choose option from all words.
					anOption = this.chooseRandomObject(_allWordsFilteredByTag);
                  
					if (idsOfOptions.indexOf(anOption._id) == -1) {
						// the new option is not included yet
  			                  idsOfOptions.push(anOption._id);
						options.push(anOption);
					}
					else {
						countTries++;
						if(countTries >= 10)
						{
							//no other answer possiblities exist, so exit
							break;
						}
					}

				} while (options.length < n);


			}
			return _shuffle(options);
		},







		config : function(config){
			throw new Error("not yet implemented");
		},








		status : function(){
			// give the number of words in the whole box,
			// the number of words in the wordsToReview array and
			// information about the session which was updated by _updateSessionInfo()

			_status.numberOfWords = this.db.numberOfWords();

			if (_wordsToReview) {_status.noOfwordsToReview = _wordsToReview.length;}

			return _status;
		},








		addMoreWordsForLearning : function(n){
			console.log("addMoreWordsForLearning");
			// update n words with step value < 0 to have a step value of 0
			var lowestStepValue = this.db.getSettings().lowestStepValue;
			var candidatesToAdd = this.wordsWithStepValue(lowestStepValue,-1);

			// sort according to step value descending, e.g. -1,-2,-3 ...
			// sort is in place
			candidatesToAdd.sort(function(a,b) {return a.step < b.step;});


			var numberOfWordsToAdd;
			// if not enough words are left to add only add what is available
			if (n < candidatesToAdd.length) { numberOfWordsToAdd = n;}
			else {numberOfWordsToAdd = candidatesToAdd.length;}


			// Update db with new step values

			for (var i = 0; i < numberOfWordsToAdd; i++){
				(candidatesToAdd[i]).step = 0;
				db.putWord(candidatesToAdd[i]);
				console.log(i, (candidatesToAdd[i]).word);
			}


		},



		wordsByTag : function(wordsToFilter, tag){

			function hasThisTag(aWord) {
				var arrTags = aWord.tags.split(',');
				return (arrTags.indexOf(tag) >= 0);
			}

			return (wordsToFilter).filter(hasThisTag);
		},

		wordsToPractice : function(tag, again){

			var todayNow = new Date().valueOf();

			function isToBePracticed(aWord) {
				if(again == true)
				{
					console.log("return to be practiced again");
					return (aWord.queried == 1 && aWord.point == 0);
				}
				else
				{
					return (aWord.queried == 0);
				}
			}

			if (_question === null || _wordsToPractice === null ) {
				_wordsToPractice = (this.db.allWords()).filter(isToBePracticed, again);
			}

			_wordsToPractice = this.wordsByTag(_wordsToPractice, tag);

			console.log("words to practice:");
			console.log(_wordsToPractice);
  
			return _wordsToPractice;
		},

		wordsToReview : function(){

			// calculate the array with words which are to be learned/repeated during a sessio

			// all words with step value 1 and above are considered.
			var lowestStep = 0;

			// words with a date value >= todayNow are considered
			var todayNow = new Date().valueOf();


			// the function with the condition for inclusion into the result array
			function isToBeReviewed(aWord) {
				return (aWord.queried >= 1) && (aWord.step >= lowestStep) && (todayNow >= aWord.date);
			}

			if (_question === null || _wordsToReview === null ) {
				// _question == null means that either a question has never
				// been asked before or that a question has been asked and
				// processed but no new question yet has been picked.
				// In both cases a new _wordsToReview collection is necessary.

				_wordsToReview = (this.db.allWords()).filter(isToBeReviewed);
				
				_sessionExpiryTimeInSeconds = (this.db.getSettings()).sessionExpiryTimeInSeconds;
				_updateSessionInfo(_sessionExpiryTimeInSeconds);

				
				if (_status.sessionIsNew) {
					// the opportunity to check if we have enough _wordsToReview
					var suggestedNumberOfWordsInASession = (this.db.getSettings()).suggestedNumberOfWordsInASession;

					if (_wordsToReview.length < suggestedNumberOfWordsInASession) {
						// we need to
						this.addMoreWordsForLearning(suggestedNumberOfWordsInASession - _wordsToReview.length);
						// and recalulate
						_wordsToReview = (this.db.allWords()).filter(isToBeReviewed);
					}

					_status.sessionIsNew = false;
				}
                
			}

			//_wordsToReview = lw.wordsByTag(_wordsToReview, tag);

			console.log("words to review:");
			//console.log(_wordsToReview);

			return _wordsToReview;
		},







		wordsWithStepValue : function(from, to){
			var toValue;

			if ( typeof(to) === "undefined" || to === null ) {toValue = from;}
			else {toValue = to;}

			function stepValueInRange(aWord) {
				return (aWord.step >= from) && (aWord.step <= toValue);
			}


			return (this.db.allWords()).filter(stepValueInRange);
		}

	};




}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') 
{
	module.exports = BoxOfQuestions;
}
