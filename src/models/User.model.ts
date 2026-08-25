import mongoose, {Schema, Document}  from "mongoose"; // Schema= blueprint builder, Document= MongoDB document type
import bcrypt from "bcryptjs"; // bcrypt= for hashing and comparing passwords

//defines the shapepattern of a User in Typescript
//IUser tells Typescript what fields a User has
export interface IUser extends Document { // extends Document= adds MongoDB built-in fields like_id
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;  // custom method to compare passwords
}

//builds the actual blueprint using the IUser interface
const UserSchema= new Schema<IUser>(
    {
        name: {
            type: String,
            required:true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password:{
            type: String,
            required:true,
        },
    },
    {
        timestamps: true,  // auto adds createdAt and updatedAt fields
    }
);

// ─────────────────────────────────────────────────────
// PRE-SAVE HOOK
// runs automatically BEFORE every save() call
// if password changed → hash it before storing
// ─────────────────────────────────────────────────────
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) 
    return ; // skip if password not changed

  const salt = await bcrypt.genSalt(10);           // generate random salt
  this.password = await bcrypt.hash(this.password, salt); // hash the password
  ;                                           // move forward to save
});



// ─────────────────────────────────────────────────────
// CUSTOM METHOD — comparePassword
// attached to every User document
// used in login to compare entered password with hashed password
// usage: await user.comparePassword("plaintext123")
// ─────────────────────────────────────────────────────
UserSchema.methods.comparePassword = async function (
  candidatePassword: string  // password entered by user during login
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password); // returns true or false
};

//creates the User model using Schema
// "User"= collection name in MongoDB (auto becomes "users")
export const User= mongoose.model<IUser>("User", UserSchema);


