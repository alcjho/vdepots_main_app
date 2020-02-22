import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

class Subscription {

    initSchema() {

        const schema1 = new mongoose.Schema(
            {
                name_fr: {
                    type: String,
                    required: true,
                },

                name_en: {
                    type: String,
                    required: true,
                },                

                description_fr: {
                    type: String,
                    required: true,
                },

                description_en: {
                    type: String,
                    required: true,
                },                

                active: {
                    type: String,
                    enum: ['yes', 'no'],
                },

                cycle: {
                    type: String,
                    enum: ["monthly", "Yearly", "Daily", "Weekly"]
                }
            }, 
            
            { 
                timestamps: true
            }
        );

        schema1.path('active', 'cycle').options.enum;
        schema.plugin(uniqueValidator);
        mongoose.model("Plan", schema1);


        const schema2 = new mongoose.Schema(
            {
                plan_id: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
                account_id: [{ type: Schema.Types.ObjectId, ref: 'Account' }],
                description_fr: {
                    type: String,
                    required: false,
                },

                description_en: {
                    type: String,
                    required: false,
                },

                status: {
                    type: String,
                    enum: ['active', 'cancel', 'stop'],
                },

                startDate:{
                    type: Date,
                    required: true
                },

                endDate:{
                    type: Date,
                    required: true
                },               

                cancellation_reason_fr: {
                    type: String
                },

                cancellation_reason_en: {
                    type: String
                }               
            }, 
            
            { 
                timestamps: true
            }
        );

        schema2.plugin(uniqueValidator);
        mongoose.model("Subscription", schema2);        
        
    }

    getInstance() {
        this.initSchema();
        //return mongoose.model("Subscription");
    }

    /**
     * @param {*} data 
     * @return json
     */
    createSubscription(data){

    }

    /**
     * 
     * @param {*} uid_subscription 
     * @return bool
     */
    cancelSubscription(uid_subscription){

    }

    /**
     * 
     * @param {*} uid_subscription
     * @return json
     */
    changeSubscription(uid_subscription){

    }
}

export default Subscription;
