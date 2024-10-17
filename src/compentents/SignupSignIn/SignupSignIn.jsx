import React, { useState } from 'react';
import Input from "../input/Input";
import Button from '../Button';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from '../../firebase'; // Import db here
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from "firebase/firestore"; 

const SignupSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Signup Function
  async function signupWithEmail(e) {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmedPassword) {
      toast.error("Please fill in all the fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmedPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Clear form fields
      setName("");
      setEmail("");
      setPassword("");
      setConfirmedPassword("");

      // Navigate to dashboard
      navigate("/dashboard");

      // Add logic for document creation
      await createDoc(user);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Login Function
  async function loginWithEmail(e) {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Please fill in all the fields.");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Navigate to dashboard
      navigate("/dashboard");

      // Clear login form fields
      setEmail("");
      setPassword("");

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Google Authentication
  async function googleAuth() {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create document for new user
      await createDoc(user);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Document creation function
  async function createDoc(user) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid); // Ensure "users" collection is correct
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          name: user.displayName || name,
          email: user.email,
          photoURL: user.photoURL || "",
          createdAt: new Date(),
        });
      } catch (error) {
        console.log("Error creating document:", error);
      }
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
      {isLoginForm ? (
        <>
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to <span className="text-indigo-600">Finacely</span>
          </h2>

          <form className="space-y-4" onSubmit={loginWithEmail}>
            {/* Email Address */}
            <Input
              label={"Email Address"}
              state={email}
              setState={setEmail}
              placeholder={"example@email.com"}
              type="email"
            />

            {/* Password */}
            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter your password"}
              type="password"
            />

            {/* Submit Button */}
            <Button
              disabled={loading}
              text={loading ? "Logging in..." : "Login Using Email and Password"}
              onClick={loginWithEmail}
            />

            <p className="text-center font-semibold text-lg text-gray-700 my-4">Or</p>
            <Button text={"Login With Google"} blue={true} onClick={googleAuth} />

            <p
              className="text-center font-semibold text-lg text-gray-700 my-4 cursor-pointer"
              onClick={() => setIsLoginForm(false)}
            >
              Don't Have an Account? Sign Up Here
            </p>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-center mb-6">
            Sign Up on <span className="text-indigo-600">Finacely</span>
          </h2>

          <form className="space-y-4" onSubmit={signupWithEmail}>
            {/* Full Name */}
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />

            {/* Email Address */}
            <Input
              label={"Email Address"}
              state={email}
              setState={setEmail}
              placeholder={"example@email.com"}
              type="email"
            />

            {/* Password */}
            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter your password"}
              type="password"
            />

            {/* Confirm Password */}
            <Input
              label={"Confirm Password"}
              state={confirmedPassword}
              setState={setConfirmedPassword}
              placeholder={"Re-enter your password"}
              type="password"
            />

            {/* Submit Button */}
            <Button
              disabled={loading}
              text={loading ? "Signing Up..." : "Sign Up Using Email and Password"}
              onClick={signupWithEmail}
            />

            <p className="text-center font-semibold text-lg text-gray-700 my-4">Or</p>
            <Button text={"Sign Up With Google"} blue={true} onClick={googleAuth} />

            <p
              className="text-center font-semibold text-lg text-gray-700 my-4 cursor-pointer"
              onClick={() => setIsLoginForm(true)}
            >
              Already Have an Account? Log In Here
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default SignupSignIn;
