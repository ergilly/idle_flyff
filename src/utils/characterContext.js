import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import firebase_app from '../firebase/config';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
const auth = getAuth(firebase_app);
export const CharContext = React.createContext({});

function onAuthStateChange (callback) {
  return onAuthStateChanged(auth, (character) => {
    if (character) {
      callback({ selected: true });
    } else {
      callback({ selected: false });
    }
  });
}

function selectCharacter () {

}

function CharCreateView ({ setCreateChar, onClick, error }) {
  return (
        <div>
        </div>
  );
}

function CharSelectView ({ setCreateChar, onClick, error }) {
  return (
        <div>
        </div>
  );
}

export function UserProvider ({ children }) {
  const [character, setCharacter] = useState({ selected: false });
  const [createChar, setCreateChar] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setCharacter);
    return () => {
      unsubscribe();
    };
  }, []);

  const requestCharacter = useCallback(() => {
    selectCharacter().then(() => { setError(''); }).catch(error => setError(error.code));
  });

  if (!character.selected) {
    if (!createChar) {
      return (
                <CharSelectView setCreateChar={setCreateChar} onClick={requestCharacter} error={error}/>
      );
    } else {
      return (
                <CharCreateView setCreateChar={setCreateChar} error={error}/>
      );
    }
  }

  return (
        <CharContext.Provider value={character}>
            {children}
        </CharContext.Provider>
  );
}
