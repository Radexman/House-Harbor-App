import { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
import { UserType } from '../../types/User.types';
import Spinner from '../../components/Spinner/Spinner';
import bgImage from '../../assets/images/the-bialons-x_CEJ7kn4w4-unsplash.jpg';

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
    <>
      {isLoading && <Spinner />}
      <div
        className="hero min-h-[93vh]"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-overlay bg-opacity-80 sm:bg-opacity-70" />
        <div className="container">
          <div className="mx-auto rounded-md p-4 sm:bg-primary-content sm:bg-opacity-30 ">
            <header>
              <h1 className="text-3xl font-semibold">
                Contanct {landlord.username}
              </h1>
              <h2 className="pt-4 text-xl font-semibold">
                Send mail or call landlord to know about {landlord.username}
                &apos;s listing {searchParams.get('listingName')}
              </h2>
            </header>
            <main>
              <form className=" my-4">
                <div>
                  <p>
                    Write a message that will be sent to landlord&apos;s email
                  </p>
                  <label htmlFor="message">
                    <textarea
                      className="w-full rounded-md border-2 bg-slate-600 bg-opacity-50 p-2 text-slate-50"
                      name="message"
                      id="message"
                      value={message}
                      onChange={handleChange}
                      cols={30}
                      rows={5}
                      maxLength={300}
                    />
                  </label>
                </div>
                <div className="space-x-0 space-y-2 md:space-x-4">
                  <a
                    href={`mailto:${landlord.email}?Subject=${searchParams.get(
                      'listingName'
                    )}&body=${message}`}
                    className="w-full"
                  >
                    <button
                      type="button"
                      className={`btn btn-primary w-full md:btn-wide ${
                        !message && 'btn-disabled'
                      }`}
                    >
                      Send Message
                    </button>
                  </a>
                  {landlord.phoneNumber === null ||
                  landlord.phoneNumber === undefined ? (
                    <p>Landlord didn&apos;t provided phone number</p>
                  ) : (
                    <a href={`tel:+${landlord.phoneNumber}`} className="w-full">
                      <button
                        type="button"
                        className="btn btn-outline btn-primary mt-4  w-full md:btn-wide"
                      >{`Call ${landlord.username}`}</button>
                    </a>
                  )}
                </div>
              </form>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
