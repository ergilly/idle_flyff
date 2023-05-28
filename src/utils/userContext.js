import React, {
    useCallback, 
    useEffect, 
    useState
} from 'react';
import firebase_app from '../firebase/config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, onAuthStateChanged, getAuth } from 'firebase/auth';
const auth = getAuth(firebase_app);
export const UserContext = React.createContext({});

function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
        callback({loggedIn: true, email: user.email});
        } else {
        callback({loggedIn: false});
        }
    });
}

function login(email, password) {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => resolve())
        .catch(error => reject(error));
    });
}

function signup(email, password) {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => resolve())
        .catch(error => reject(error));
    });
}

function sendVerificationEmail() {
    return new Promise((resolve, reject) => {
        sendEmailVerification(auth.currentUser)
        .then(() => resolve())
        .catch(error => reject(error)); 
    })
}

function setUsername(username) {
    return new Promise((resolve, reject) => {
        updateProfile(auth.currentUser, { displayName: username }).catch((err) => console.log(err))
        .then(() => resolve())
        .catch(error => reject(error));
    })
}

function LoginView( { setSignUp, onClick, error }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white bg-opacity-90 px-6 py-6 shadow sm:rounded-lg sm:px-12">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input onChange={event => {setEmail(event.target.value)}} required type="email" name="email" id="email" placeholder="example@mail.com" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div className="mt-2">
                        <input onChange={event => {setPassword(event.target.value)}} required type="password" name="password" id="password" placeholder="password" autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        {/* <input checked={checked} onChange={handleChange} id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/> */}
                        <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
                    </div>

                    <div className="text-sm leading-6">
                        {/* <a onClick={handleReset} href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a> */}
                    </div>
                </div>

                <div>
                    <button onClick={() => {onClick(email, password)}} type="button" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    <span>{error}</span>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                New to Flyff Idle?
                    <a onClick={() => {setSignUp(true)}} href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Create a new account here!</a>
                </p>
            </div>
        </div>
    );
}

function SignUpView( { setSignUp, onClick, error }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white bg-opacity-90 px-6 py-6 shadow sm:rounded-lg sm:px-12">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mb-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for Flyff Idle</h2>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Display name</label>
                    <div className="mt-2">
                        <input onChange={event => {setUsername(event.target.value)}} required type="text" name="username" id="username" placeholder="username" autoComplete="username" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input onChange={event => {setEmail(event.target.value)}} required type="email" name="email" id="email" placeholder="example@mail.com" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div className="mt-2">
                        <input onChange={event => {setPassword(event.target.value)}} required type="password" name="password" id="password" placeholder="password" autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <button onClick={() => {onClick(username, email, password)}} type="button" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
                    <span>{error}</span>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                Already have an account?
                    <a onClick={() => {setSignUp(false)}} href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign in here!</a>
                </p>
            </div>
        </div>
    );
}

export function UserProvider({ children }) {
    const [user, setUser] = useState( {loggedIn: false} );
    const [signUp, setSignUp] = useState(false)
    const [error, setError] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
        unsubscribe();
        }
    }, []);

    const requestLogin = useCallback((email, password) => {
        login(email, password).then(() => {setError("")}).catch(error => setError(error.code));
    });

    const requestSignUp = useCallback(async (username, email, password) => {
        signup(email, password)
        .then(() => {
            setUsername(username)
            .then(() => {
                sendVerificationEmail()
                .then(() => {
                    setSignUp(false)
                    setError("")
                })
                .catch(error => setError(error.code));
            })
            .catch(error => setError(error.code));
        })
        .catch(error => setError(error.code))
    });

    if (!user.loggedIn) {
        if(!signUp) {
            return (
                <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fog_flyff-transformed.jpg?alt=media&token=574c202d-d695-4481-85bd-8fcdb197fb79')] bg-no-repeat bg-cover bg-center">
                    <LoginView setSignUp={setSignUp} onClick={requestLogin} error={error}/>
                </div>
            );
        } else {
            return (
                <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('https://firebasestorage.googleapis.com/v0/b/flyff-idle.appspot.com/o/images%2Fapp%2Fog_flyff-transformed.jpg?alt=media&token=574c202d-d695-4481-85bd-8fcdb197fb79')] bg-no-repeat bg-cover bg-center">
                    <SignUpView setSignUp={setSignUp} onClick={requestSignUp} error={error}/>
                </div>
            );
        }
    }

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}
