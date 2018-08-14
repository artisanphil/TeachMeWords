cordova build --release android

cd platforms/android/build/outputs/apk

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ~/Documents/work/LiteracyApp/my-release-key.keystore android-armv7-release-unsigned.apk alias_name
testing12#

rm TeachMeWords.apk

/Users/philipperry/Library/Android/sdk/build-tools/28.0.1/zipalign -v 4 android-armv7-release-unsigned.apk TeachMeWords.apk

pwd
#cd platforms/android/build/outputs/apk
adb install -r LearnWords.apk
#adb shell input text adf23# && adb shell input keyevent 66
