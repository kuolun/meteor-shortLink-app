import {Mongo} from 'meteor/mongo';
import validUrl from 'valid-url';
import {check,Match} from 'meteor/check';


//this method will be executed in both client and server
Meteor.methods({
    'links.insert':function(url){
        //check if url is valid 
        check(url,Match.Where(url => validUrl.isUri(url)));

        //create random token
        const token = Math.random().toString(36).slice(-5);

        //insert one record to links collection
        Links.insert({url,token,clicks:0});
    }
});

export const Links = new Mongo.Collection('links');