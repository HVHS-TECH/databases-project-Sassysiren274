//firebase.database().ref('/info').set
/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/
firebase.database().ref('/').set(
    {
        message: 'Hello World!'
    }
)