import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from './../Store/useAuthStore';

export default function OAuth() {
  const navigate = useNavigate();
  const googleSignin = useAuthStore((state) => state.googleSignin);

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const googleData = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      const user = await googleSignin(googleData);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error("Could not sign in with Google", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="flex items-center justify-center p-3 px-4 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-500 transition-all"
    >
      <svg
        className="w-5 h-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          fill="#4285F4"
          d="M47.532 24.551c0-1.639-.136-3.23-.394-4.765H24v9.044h13.277a11.372 11.372 0 0 1-4.92 7.467v6.209h7.956c4.661-4.293 7.219-10.63 7.219-17.955z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.907-2.15 15.876-5.808l-7.957-6.21c-2.212 1.482-5.027 2.366-7.919 2.366-6.083 0-11.23-4.12-13.076-9.67H2.824v6.084C6.782 43.278 14.839 48 24 48z"
        />
        <path
          fill="#FBBC05"
          d="M10.924 28.678A13.9 13.9 0 0 1 9.917 24c0-1.62.282-3.197.783-4.678V13.24H2.824A23.977 23.977 0 0 0 0 24c0 3.742.885 7.274 2.824 10.76l8.1-6.082z"
        />
        <path
          fill="#EA4335"
          d="M24 9.548c3.524 0 6.681 1.215 9.164 3.594l6.854-6.854C34.963 2.246 29.984 0 24 0 14.84 0 6.782 4.722 2.824 13.24l8.876 6.084C12.77 14.67 17.917 9.548 24 9.548z"
        />
      </svg>
      Continue with Google
    </button>
  );
}
