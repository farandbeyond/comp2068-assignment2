/**
 * Created by Connor on 2016-11-16.
 */
module.exports = {
    db: 'mongodb://admin:adminpass@ds155737.mlab.com:55737/200313751-comp2068-assign2',
    secret: 'UseThis to create salt 123',
    ids: {
        facebook: {
            clientID: '1664602067165213',
            clientSecret: 'de4798fafd38e5d1f8d647e19f08a534',
            callbackURL: 'http://localhost:3000/facebook/callback'
        },
        github: {
            clientID: '8f17d6d783210ec26edc',
            clientSecret: '123e1af2f8093fc6102fd2763ab54f98b41e1ded',
            callbackURL: 'http://localhost:3000/github/callback'
        },
        google: {
            clientID: '516160540008-aat4pkss8r28ncphk7mv44ab0qgt8hvc.apps.googleusercontent.com',
            clientSecret: 'JIhlCpN1DeYoBm-z2NqAMm04',
            callbackURL: 'http://localhost:3000/google/callback'
        }
    }
};
