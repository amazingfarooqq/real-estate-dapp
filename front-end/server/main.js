const express = require('express');
const app = express()
const path = require('path')


const fs = require('fs');
// security purpose
const cors = require('cors')
app.use(cors())

// send emails
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

// dotenv
const dotenv = require("dotenv");
dotenv.config()

// mongoclient
const { MongoClient, ObjectId } = require('mongodb');

// port
const PORT = 5000

app.use(express.urlencoded({extended: false}))
app.use(express.json())

const multer = require("multer");

app.use('/images', express.static(path.join(__dirname, '/images')));

app.get('/', (req,res) => {
    res.send(`Server is running`)
})

const fileStorageEngine = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null , "./images/")
    },
    filename: (req , file, cb) => {
        cb(null , Date.now() + "--" + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine})

//     const admin = require("firebase-admin");
//     // https://firebase.google.com/docs/storage/admin/start
//     var serviceAccount ={
//         "type": "service_account",
//         "project_id": "projectforuploadingfiles",
//         "private_key_id": "af50f920a604257be5ceb822c4ef86aea62bfc6d",
//         "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6mVIH9uKuJLGK\nextmGlXxhJxm+eP1B2Qk2k3rCiE4HXSQFk9lQqgWyjG4nYCd6UKmAAosdlQV/8FE\n/IM4CrpOgWE9kRncvqFoTnuudaNqTwWmPHV4lKfbQphpJiTd2vzIrFS9L1JBYPLd\nW5TlpX2g4aNcGmyFPtdxDDPDipNBMoETT5bPZ81HB21V7ZFrlU1WBUuf8A93bfSN\nG6lGBeRl93KWv2PajvOS8xptVXQYH0kRM4Usw/r+tHi8C7PJ60Qz6xa52SURq8AY\n6OKjNr1slVnvY56WWDu97Tnx69c5plXiX/OYtV55Yu75UydbK7S8VsBpkxN6Qgvq\nN8ofnO8RAgMBAAECggEACId70wqfTam2dk+eft4nDcc7nW7gczmrY45Zd6wCvPWG\nt5PXfPfNJl6HY4qKf51TCzKvBF2Dxi4ms8wthM0juzUpgFaOtbL+fn2w5FZy+efj\nCJhUn8Z+vjRW8l54mq349kS/Slb8henELCdUoOMdwRHzRUFdcsE+uId/4bkmtjkA\nRI4buT2Vk4H+F5rmtYeZsW8f3qbSJNGHMtQrWG+1trbJEx5g5ed0b7GWCSI/7kRj\nZwscVV112tVKvauJQvwB3NSn5vj/1I6sACNgpbu01YM8WAODtqV+tP+v5ntsVmiA\nVPdVvh8NvRrvgHWbABQyk4Kv6O1GEz8eeZqFNK7biQKBgQD1rPVyR0FhDsrH3Ngl\n0bymspUKGWux+zR2L5iGt2vfY3ZK9dR30c6v6ANGaT666og3tlTh4nwAhMGibyzV\nl5bqqzVgOCkS5vfxWv+oI9UQbyS+tbai8MV9cnOuWpVCxQHWoN4LYJZ3QkaHX9Ag\n3S0hSKvcbG3vMLt/VOdCqZwFmQKBgQDCcMycdrC7EXGccCogsTmCWRAcdLGGnFTW\ntYCkTiPnYj0l+GjEoqFy8gD/Dqv91NjH+UlHTrMqqQX76muypLEmF2xLmS+63d1j\nfKnj84VOU5uKNWIEVsuTIN9S2p6PxRU9BKAx3cmmQ6tH//d8lE2s6URpdClh5pHt\nnMgnj0swOQKBgAzT8ST8b39/5Dq3X1nqL62MmZejaCos8bpSFebC4RETAnQ7jdKL\n0/z/Ylxk1m+wG1i9XoVE7DCivfGbWH32olyyf+D8Tbi88qlZlQvUgyWOiB6lIloz\ntDwuo7ew5yZLXyMz1yRE8NZdUY10BUwSAG9CeibSSpM4ujGV31VtwcXRAoGBAJ7Y\n0A+y10a8RXhsGb6Dilv2rrbQjodOB/EwblvMioBpPVNb0RtzUTo6gp3cOp4v2Lnl\n6fubS7u6Qe0/4aQb760SzaIlD102C7tPCOv08h6/Jv6OBflNfxo/bLKfb5I8i9FB\nii2y5x4xgihb8K+R6LMuDnmoMHaOiwD3aH0JD3/hAoGAWA80ihzUdZENncA7xASh\nJxYkuobS7MzQvRb+ZkE+1Fu2DryDYmfPZnZjId6xSch+lQuNKtVLH7hwAGir9ltd\nolnycguIeHqGiVawl9sI+St8hyGJ4PT3LOH1QW4i79+oFIgtbPv8mbtmkJ3tljtf\nl5sUQaQNahC2PL8U+acRflo=\n-----END PRIVATE KEY-----\n",
//         "client_email": "firebase-adminsdk-9deeo@projectforuploadingfiles.iam.gserviceaccount.com",
//         "client_id": "108747605948150471720",
//         "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//         "token_uri": "https://oauth2.googleapis.com/token",
//         "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//         "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9deeo%40projectforuploadingfiles.iam.gserviceaccount.com"
//     }
    
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         databaseURL: "https://projectforuploadingfiles-default-rtdb.firebaseio.com"
//     });
//     const bucket = admin.storage().bucket("gs://projectforuploadingfiles.appspot.com");

// REGISTERATION
app.post('/authregister', upload.any() , (req , res) => {

    console.log(req.body.isAgency === "partOfAgency")
        
          
        const profileImage = req.files.find(file => file.fieldname == 'profileImage')
        const passportImage = req.files.find(file => file.fieldname == 'passportImage')
        const accepttermssignature = req.files.find(file => file.fieldname == 'accepttermssignature')
        const corporationNameUrl = `https://search.sunbiz.org/Inquiry/CorporationSearch/SearchResults/EntityName/${req.body.corporationName}/Page1?searchNameOrder=${req.body.corporationName.toUpperCase()}`;
        const notCorporationNameUrl = `https://www.miamidade.gov/global/navigation/global-search.page?q=${req.body.notCorporationName}`

        console.log(profileImage && profileImage.path);
        console.log(passportImage && passportImage.path);

        MongoClient.connect(process.env.CONNECTIONSTRING  ,  async (err , client) => {
            const db = client.db()
            const con = db.collection("users");

            if (!profileImage || !passportImage || !accepttermssignature || !req.body.email || !req.body.password || !req.body.firstName ||
                !req.body.lastName || !req.body.phoneNumber || !req.body.age ||
                !req.body.dob || !req.body.address || 
                (!req.body.corporationName && !req.body.notCorporationName)
                ) {
                  res.send({
                      status: 503,
                      message: `Plase fill out complete Registration form`
                  })
                  
                return;
            } 

                try {
                   const checkemail = await con.find({email: req.body.email}).toArray()
                   const checkedemail = checkemail[0] && checkemail[0].email  

                   if(checkedemail === req.body.email) {
                        res.send({
                           status: 503,
                           message: `This email is already registered`
                       })
                       return
                   } else {

                    await con.insertOne({
                        profileImage: profileImage.path,
                        passportImage: passportImage.path,
                        accepttermssignature: accepttermssignature.path,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email:  req.body.email, 
                        phoneNumber:  req.body.phoneNumber, 
                        password : req.body.password,
                        age: req.body.age,
                        dob: req.body.dob,
                        address: req.body.address,
                        role: 'user',
                        approvement: "Pending",
                        isCorporation: req.body.isCorporation === "true",
                        isAgency: req.body.isAgency === "partOfAgency",
                        corporationName: corporationNameUrl,
                        notCorporationName: notCorporationNameUrl,
                        rejectedReason: ''
                    })

                   res.send({
                       status: 200,
                       message: `Thanks for registration`
                    }) 
                }
                } catch (error) {
                    console.log('database', error);
                }


            client.close()
        })

})

// LOGIN
app.post('/authlogin', (req , res) => {
    
    // console.log(req.body.email);
    // console.log(req.body.password);

    MongoClient.connect(process.env.CONNECTIONSTRING  ,  async (err , client) => {
        const db = client.db()
        const con = db.collection("users");
        if (!req.body.email || !req.body.password) {
                res.send({
                    status: 403,
                    message: `please enter your email/password`
                })
            return;
        }

            try {
                const getUser = await con.findOne(
                    {
                        email: req.body.email,
                        password: req.body.password,
                    })

                    if(getUser) {
                        if(req.body.email === getUser.email && req.body.password === getUser.password){
                            
                            res.send({
                                status: 200,
                                message: `correct info`,
                                email: req.body.email,
                                getUser: getUser 
                            })
                        }
                    } else {
                        res.send({
                            status: 503,
                            message: `not correct info`
                        })
                    }
                
            } catch (error) {
                console.log('database', error);
            }

        client.close()
    })

})

// PROFILES
app.post('/profiles', (req , res) => {
    
    // console.log(req.body.email);
    // console.log(req.body.password);

    MongoClient.connect(process.env.CONNECTIONSTRING  ,  async (err , client) => {
        const db = client.db()
        const con = db.collection("users");

            try {
                const getUsers = await con.find().toArray()       
                res.send({
                  status: 200,
                  getUsers: getUsers 
                })
            }              
            catch (error) {
                console.log('database', error);
            }

        client.close()
    })

})

// UPDATE USER
app.post('/updateuser', function (req, res) {

    MongoClient.connect(process.env.CONNECTIONSTRING, async (err , client) => {
        const db = client.db()
        const con = db.collection("users");

        // var myquery = { email: req.body.email };
        // var newvalues = { $set: {approvement: req.body.approvement} };
        // con.updateOne(myquery, newvalues);

        try {
            var myquery = { email: req.body.email };
            var newvalues = { $set: {
                                approvement: req.body.approvement, 
                                role: req.body.roleIs , 
                                rejectedReason: req.body.rejectedReason} 
                            };
            con.updateOne(myquery, newvalues);

            console.log('approvement:' , req.body.approvement);
            console.log('approvement:' , req.body.roleIs);
            console.log('approvement:' , req.body.rejectedReason);

                const msg = {
                    to: req.body.email, // Change to your recipient
                    from: 'farooqdaadkhan@gmail.com', // Change to your verified sender
                    subject: `${req.body.approvement === 'Approved' ? 'Your KYC has been approved, Start Selling/Buying property from Santa-Stella' : req.body.approvement === 'Rejected' ? `Your request for KYC has been rejected because ${req.body.rejectedReason}` : ''}`,
                    text: 'Sample check text',
                    html: '<strong>sample check html</strong>',
                  }
                sgMail
                   .send(msg)
                   .then(() => {
                     console.log('Email sent')
                   })
                   .catch((error) => {
                     console.error('error')
                     console.error(error)
                   })
            
            
           
            res.send({
              status: 200,
              message: 'done' 
            })
        }              
        catch (error) {
            console.log('database', error);
        }

        
      });


});


// app.post('/uploadfiles', upload.any() , (req , res) => {

        
//     console.log(req.files[0].path)
    
    
//          bucket.upload(
//             req.files[0].path,
//             // {
//             //     destination: `${new Date().getTime()}-new-image.png`, // give destination name if you want to give a certain name to file in bucket, include date to make name unique otherwise it will replace previous file with the same name
//             // },
//             function (err, file, apiResponse) {
//                 if (!err) {
//                                 // console.log("api resp: ", apiResponse);
                
//                                 // https://googleapis.dev/nodejs/storage/latest/Bucket.html#getSignedUrl
//                 file.getSignedUrl({
//                          action: 'read',
//                          expires: '03-09-2491'
//                      }).then( async (urlData, err) => {
//                          if (!err) {
//                              console.log('data')
//                              console.log("public downloadable url 1: ", urlData)

//                             //  ProjectsModel.create({
//                             //     "name":'req.body.productName',
//                             //     "gitlink": 'req.body.gitlink',
//                             //     "deploylink": 'req.body.deploylink',
//                             //     "deploylink": 'req.body.deploylink',
//                             //     "userName": 'user.name',
//                             //     "email": 'user.email',
//                             //     "image": urlData[0],
//                             //     "description": 'req.body.description',
//                             //     "project": 'req.body.project'
//                             // }).then((data) => {
//                             //     console.log(data)

//                             try {
//                                 fs.unlinkSync(req.files[0].path)
//                             } catch (err) {
//                                 console.error(err)
//                             }
//                                 res.send({
//                                     status: 200,
//                                     imageone: urlData[0],
                                    
//                                 })
//                             // }).catch(() => {
//                             //     console.log(err);
//                             //     res.status(500).send({
//                             //         message: "user create error, " + err
//                             //     })
//                             // })

//                             //  res.send('ok');

                           
//                          }
//                      })
//                             }else{
//                                 console.log("err: ", err)
//                                 res.status(500).send();
//                             }
//                         });

                  


// })

app.listen(process.env.PORT || PORT)