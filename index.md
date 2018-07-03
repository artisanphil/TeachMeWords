<style>
img {border: black 1px solid !important; }
</style>
# About
TeachMeWords main target group are people who can’t read or are learning a foreign language. It’s based on sound and pictures/text. It’s similar to other flashcard apps like Anki.

These are the main advantages:

* Very easy to use
* Answers are in multiple choice format
* User can choose from 3 modes: Learn, Practice and Review (spaced-repetition)

# Download

* Search for "TeachMeWords" in Google Play -> <a href="https://play.google.com/store/apps/details?id=com.sil.teachmewords">direkt link</a>
* Or download the <a href="https://github.com/phil4literacy/TeachMeWords/releases/download/1/TeachMeWords.apk">apk file</a> and install it on your Android phone

# Example Lessons

Here are some example lessons that you can try out. Copy one of the apkg example lessons onto your phone and run TeachMeWords to import them.

<a href="https://github.com/phil4literacy/TeachMeWords/releases/download/1/Hangul.apkg">Hangul.apkg</a>
A few lessons for learning the sound of Korean vowels.

<a href="https://github.com/phil4literacy/TeachMeWords/releases/download/1/deutsch-lektionen.apkg">deutsch-lektionen.apkg</a>
A few lessons on learning some German words. These lessons use audio and pictures (instead of text).

<a href="https://github.com/phil4literacy/TeachMeWords/releases/download/1/SightWords.apkg">SightWords.apkg</a>
This one I created for my kindergarten aged son, to learn the sound of frequent English words like "they", "with", "were", etc.

# How to use
## Import
When you open the app, you will first be asked to import a apkg file. This apkg file needs to be placed somewhere on your Android device. 

<img src="/TeachMeWords/resources/screenshots/import.png" alt="Import an apkg file">

## Lessons
After you have imported your apkg file, you can choose a lesson.

<img src="/TeachMeWords/resources/screenshots/lessons.png" alt="Choose a lesson">

## Learn Modes

Now one can choose a learn mode. 

<img src="/TeachMeWords/resources/screenshots/select_mode.png" alt="Choose Learn Mode">

* Learn: Click on the book image. 
* Practice: Click on the image with the hand
* Review: Hidden in menu, see instructions below

***Learn Mode***

In the learn mode you can press on a card to hear how it is pronounced. Click on the arrow button to see more cards.

<img src="/TeachMeWords/resources/screenshots/learn.png" alt="Learn Mode">

***Practice Mode***

In practice mode you will hear a word (or letter) and then you need to choose from one of 4 options. It won't continue to the next word until you have made the correct selection. After you have gone through all words in the lesson, the wrong answered words will be questioned again.

<img src="/TeachMeWords/resources/screenshots/practice.png" alt="Practice Mode">

***Review Mode***

The review mode is optional (and currently slightly hidden). You can find it by clicking on the hamburger menu on the lesson overview page. In the review mode you get to practice all lessons you have already gone through. It will start with the questions you answered wrong. The words don't show up until the next day. This uses spaced-repetition, so it will ask words you already know less often. 

## Create Lessons

Lessons for TeachMeWords are created in <a href="https://apps.ankiweb.net/" target="_blank">Anki Desktop</a>. Anki, like TeachMeWords, is a program used for spaced repetition, but more complicated to use for the end user. It’s useful though for creating the lessons, as Anki can package all data (including mp3’s and images) into an apkg file which can be imported by TeachMeWords.

1. Download and install <a href="https://apps.ankiweb.net/" target="_blank">Anki Desktop</a>.

2. Click on the "Create Deck" button at the bottom. Then click on the deck to open it. 

4. Click on the “Add” item:

<img src="/TeachMeWords/resources/screenshots/anki-add.png">

5. This is how it should look like (minus the pronunciation field which is optional, see below): 

<img src="/TeachMeWords/resources/screenshots/TeachMeWords-card.png">

6. For the front field (the question) we add a sound file by either clicking on the clip icon or the record icon.

The clip icon will allow us to attach a mp3 file from our computer (has to be mp3). You can also drag & drop your mp3 files.

If we choose the record icon, we can immediately use our microphone to record a word and it will automatically save as an mp3 file.

In either case, it will generate a code similar to this one: [sound:rec1521777153.mp3]

<img src="/TeachMeWords/resources/screenshots/sound1.png">

7. The back field is for the answer options. You can insert a picture using the clip icon or write a text answer. Your image shouldn’t be bigger than 50kb, so that the apk file doesn’t get too big. The dimensions can be around 200x200px.

<img src="/TeachMeWords/resources/screenshots/image.png">

8. The pronunciation field can be left empty in most cases. You would need to fill it out if you have another word you are using that sounds exactly the same. For example “there” and “their”:

<img src="/TeachMeWords/resources/screenshots/pronunciation.png">

In order to add a pronunciation field, click on the "Fields" button and then click "Add" and write "pronunciation". 

<img src="/TeachMeWords/resources/screenshots/add-pronunciation.png">

9. You will be creating lessons with around 10 – 20 words. You should use a number for the lesson so that they get sorted accordingly. You can also add some text so that the student knows what it is about (if he can read). The lesson name goes into the field “tags”:

<img src="/TeachMeWords/resources/screenshots/tags.png">

10. Now you can export your lessons.