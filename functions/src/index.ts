import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
//const cors = require('cors')({ origin: true });
admin.initializeApp()

export const helloWorld = functions.https.onRequest((request, response) => {
    console.log('Hello CF!');
    response.send("Hello from Firebase! My Cloud Function");
});

export const getdata = functions.https.onRequest((request, response) => {
    admin.firestore().doc('employees/51gBViue9xQHQbBBY7kJs').get()
    .then(snapshot => {
        const data = snapshot.data()
        response.send(data)
    })
    .catch(error => {
        console.log(error)
        response.status(500).send(error)
    })
});

export const passdata = functions.https.onRequest((req, res) => {
    const conversationID = req.query.siteid;
    console.log("conversationID", conversationID);
    res.send(conversationID);
    //link to run https://us-central1-myfirstfbapp-4fa9f.cloudfunctions.net/passdata?siteid=ww11
});

export const mydel = functions.https.onRequest((request, response) => {
    return admin.firestore()
    .collection('test').doc('4l8VGkRLxUvj7X9G7W7B')
    .collection('rows').doc('kTlWPH6yE1Gs5Ol27yV8')
    .delete()
    .then(
        () => response.send("Deleting subcollection is finished!")
    )
})

export const mydel3 = functions.https.onRequest((request, response) => {
    return admin.firestore()
    .collection('test').doc('4l8VGkRLxUvj7X9G7W7B')
    .delete()
    .then(
        () => response.send("Deleting entire document is finished!")
    )  
})

export const getsub = functions.https.onRequest((request, response) => {
    return admin.firestore()
    .collection('test').doc('ehhPw6sQ8hK3kITRwDIm').collection('rows')
    .get().then(
        list => {
             list.forEach(doc => {
                response.send(doc.id +' => ' +JSON.stringify(doc.data()))
                //admin.firestore().doc('test/ehhPw6sQ8hK3kITRwDIm/rows/'+doc.id).delete()
                //.then(
                  // res => response.send(doc.id +' => ' +JSON.stringify(doc.data())+' deleted!')
                //)
             })
             
        }
    )
    // return admin.firestore()
    // .collection('test').doc('ehhPw6sQ8hK3kITRwDIm').listCollections().then(
    //     sub => response.send(JSON.stringify(sub))
    // )
})

export const del = functions.https.onRequest((request, response) => {
    const ar = [];
    const a = admin.firestore()
    .collection('test').doc('ehhPw6sQ8hK3kITRwDIm')
    .collection('rows').doc('R4iLeKafBMq3G9nkh8Pr')
    .delete()
    .then(
        () => response.send("Deleting subcollection is finished!")
    )
    ar.push(a);
    const b =  admin.firestore()
    .collection('test').doc('ehhPw6sQ8hK3kITRwDIm')
    .delete()
    .then(
        () => response.send("Deleting entire document is finished!")
    )
    ar.push(b)
    return  Promise.all(ar);
})

export const alldel = functions.https.onRequest((request, response) => {
    return admin.firestore()
    .collection('test').doc('doc2')
    .collection('rows').doc('rw2')
    .delete()
    .then(
        () => response.send("Deleting subcollection is finished!")
    )
    .then(
        () => {
            return admin.firestore()
            .collection('test').doc('doc2')
            .delete()
            .then(
                () => response.send("Deleting entire document is finished!")
            )
        }
    )
})

export const alldel2 = functions.https.onRequest((request, response) => {

    return admin.firestore()
    .collection('test').doc('doc2').collection('rows')
    .get().then(
        list => {
            return admin.firestore()
                .collection('test').doc('doc2')
                .collection('rows').doc(list.docs[0].id)
                .delete()
                .then(
                    () => response.send("Deleting subcollection is finished!")
                )
                .then(
                    () => {
                        return admin.firestore()
                        .collection('test').doc('doc2')
                        .delete()
                        .then(
                            () => response.send("Deleting entire document is finished!")
                        )
                    }
                )
            //response.send(id +' => ' +JSON.stringify(list.docs[0].data()))
            //admin.firestore().doc('test/ehhPw6sQ8hK3kITRwDIm/rows/'+doc.id).delete()
            //.then(
                // res => response.send(doc.id +' => ' +JSON.stringify(doc.data())+' deleted!')
            //)   
        }
    )
})

export const del2 = functions.https.onCall((data, context)=> {
    //const path = data.path;
    const text = data.message;
    // Authentication / user information is automatically added to the request.

    console.log(`User has requested to delete path ${text}`);
    // returning result.
    return {
        firstNumber: 'firstNumber',
        secondNumber: 'secondNumber',
        operator: '+',
        operationResult: text,
    };
});

export const del_order = functions.https.onCall(async (data, context) => {
    const doc_guid = data.docid;
   
    try {
        const promises = [];
        const subcol = await admin.firestore().collection('orders').doc(doc_guid).collection('lines').listDocuments();
        subcol.forEach(
            doc => {
               const p = doc.delete();
               promises.push(p);
            })
        const maincol = await admin.firestore().collection('orders').doc(doc_guid).delete();
        promises.push(maincol);
        return Promise.all(promises);
    } catch (error) {
        console.log(error);
        return {error}
    }

})