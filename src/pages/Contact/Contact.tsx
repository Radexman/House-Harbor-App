import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
import { UserType } from '../../types/User.types';
import Spinner from '../../components/Spinner/Spinner';

function Contact() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [landlord, setLandlord] = useState<UserType>({} as UserType);
  const [searchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      setIsLoading(true);
      // Add to context and set loading screen
      if (!params.landlordId) {
        toast.error('Wrong landlord data');
        setIsLoading(false);
        return;
      }
      const docRef = doc(db, 'users', params.landlordId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandlord(docSnap.data() as UserType);
      } else {
        toast.error('Could not get landlord data');
      }
      setIsLoading(false);
    };

    getLandlord();
  }, [params?.landlordId]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading && <Spinner />}
      <header>
        <h1 className="text-3xl font-semibold">Contanct Landlord</h1>
      </header>
      {landlord !== null && (
        <main>
          <div className="my-4">
            <p className="text-lg font-semibold">
              Contact {landlord?.username}
            </p>
          </div>
          <form className="max-w-3xl">
            <div>
              <p>Message</p>
              <label htmlFor="message">
                <textarea
                  className="w-full rounded-md border-2 p-2"
                  name="message"
                  id="message"
                  value={message}
                  onChange={handleChange}
                  cols={30}
                  rows={5}
                />
              </label>
            </div>
            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button type="button" className="btn btn-primary">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
