import { useState, ChangeEvent } from 'react';
import './LogAdventureForm.scss';
import { Adventure } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import logo from '../../Assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { postAdventureAsync } from '../../Redux/slices/AsyncThunks';
import { selectUser } from '../../Redux/slices/userSlice';

function LogAdventureForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const activity: string = useParams().activity ?? 'defaultActivity';

  const user_id = useAppSelector(selectUser).user_id;

  const [date, setDate] = useState<string | null>(null);
  const [betaNotes, setBetaNotes] = useState<string>('');
  const [image_url, setImage] = useState<string>('');
  const [stress_level, setStressLevel] = useState<string>('');
  const [hydration, setHydration] = useState<string>('');
  const [diet, setDiet] = useState<number | undefined>(undefined);
  const [sleep, setSleep] = useState<number | undefined>(undefined);
  const [userMsg, setUserMsg] = useState<string>('');
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [long, setLong] = useState<number | undefined>(undefined);

  const navigate = useNavigate();

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const originalDate: string = event.target.value;
    setDate(originalDate);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setUserMsg('');
    if (!date) {
      setUserMsg('Please specify a date for your adventure!');
      return;
    } else {
      const parsedDate = dayjs(date);
      const formattedDate = parsedDate.format('MM/DD/YYYY');

      const newAdventureData: Adventure = {
        user_id: user_id,
        activity,
        date: formattedDate || '',
        beta_notes: betaNotes,
        image_url: image_url ? image_url : logo,
        stress_level,
        hydration,
        diet,
        lat,
        lon: long,
        hours_slept: sleep,
        diet_hydration_notes: '',
        sleep_stress_notes: '',
        adventure_id: undefined,
      };
      handlePostingNewAdventure(newAdventureData);
    }
  };
  async function handlePostingNewAdventure(
    newAdventureData: Adventure
  ): Promise<void> {
    const action = await dispatch(postAdventureAsync(newAdventureData));
    if (postAdventureAsync.fulfilled.match(action)) {
    }
    navigate(`/${activity}`);
  }

  return (
    <>
      <form className='form'>
        <div className='top-line-wrapper'>
          <div className='top-line-data'>
            <p>
              Activity: <span>{activity}</span>
            </p>
            <label htmlFor='date-input'>Date:</label>
            <input
              type='date'
              name='date'
              value={date || ''}
              onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]}
            />
            <label htmlFor='image'>Add Image:</label>
            <input
              type='text'
              name='image'
              value={image_url}
              onChange={(event) => setImage(event.target.value)}
              placeholder='Enter the image URL'
            />
          </div>
          <div className='form-btn-wrapper'>
            {userMsg !== '' && <p>{userMsg}</p>}
            <button
              className='submit-button'
              onClick={(event) => handleSubmit(event)}
            >
              Submit
            </button>
          </div>
        </div>
        <div className='second-line-components'>
          <div className='stress'>
            <label htmlFor='stress-input'>Stress Level:</label>

            <select
              name='stressLevel'
              value={stress_level}
              onChange={(event) => setStressLevel(event.target.value)}
            >
              <option value=''>Select one:</option>
              <option value='None'>None</option>
              <option value='Low'>Low</option>
              <option value='Moderate'>Moderate</option>
              <option value='High'>High</option>
              <option value='Max'>Max</option>
            </select>
          </div>
          <div className='hydration'>
            <label htmlFor='hydration-input'>Hydration Level:</label>
            <select
              name='hydration'
              value={hydration}
              onChange={(event) => setHydration(event.target.value)}
            >
              <option value=''>Select one:</option>
              <option value='Dehydrated'>Dehydrated</option>
              <option value='Somewhat Hydrated'>Somewhat Hydrated</option>
              <option value='Hydrated'>Hydrated</option>
              <option value='Very Hydrated'>Very Hydrated</option>
            </select>
          </div>
          <div className='calories'>
            <label htmlFor='diet-input'>Calories:</label>
            <input
              type='number'
              name='diet'
              value={diet}
              onChange={(event) => {
                const inputValue = Number(event.target.value);
                if (inputValue >= 0) {
                  setDiet(inputValue);
                }
              }}
              min='0'
            />
          </div>
          <div className='sleep'>
            <label htmlFor='sleep-input'>Hours Slept:</label>
            <input
              type='number'
              name='sleep'
              value={sleep}
              onChange={(event) => {
                const inputValue = Number(event.target.value);
                if (inputValue >= 0) {
                  setSleep(inputValue);
                }
              }}
              min='0'
            />
          </div>
        </div>
        <div className='coordinate-wrapper'>
          <div className='lat'>
            <label htmlFor='lat-input'>Latitude:</label>
            <input
              type='number'
              name='latitude'
              value={lat}
              onChange={(event) => {
                const inputValue = Number(event.target.value);
                setLat(inputValue);
              }}
            />
          </div>
          <div className='long'>
            <label htmlFor='long-input'>Longitude:</label>
            <input
              type='number'
              name='longitude'
              value={long}
              onChange={(event) => {
                const inputValue = Number(event.target.value);
                setLong(inputValue);
              }}
              min='0'
            />
          </div>
        </div>
        <textarea
          className='notes-input'
          placeholder='Notes on activity, diet, beta, etc.'
          name='notes'
          value={betaNotes}
          onChange={(event) => setBetaNotes(event.target.value)}
        />
      </form>
    </>
  );
}

export default LogAdventureForm;
