import { useState, ChangeEvent } from 'react';
import './LogAdventureForm.scss';
import { Adventure } from '../../types';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import logo from '../../Assets/logo.png';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { postAdventureAsync } from '../../Redux/slices/AsyncThunks';
import { selectUser } from '../../Redux/slices/userSlice';

function LogAdventureForm(): React.ReactElement {
  const dispatch = useAppDispatch();
  const user_id = useAppSelector(selectUser).user_id;



  const [activity, setActivity] = useState<string>('');
  const [date, setDate] = useState<string | null>(null);
  const [betaNotes, setBetaNotes] = useState<string>('');
  const [image_url, setImage] = useState<string>('');
  const [stress_level, setStressLevel] = useState<string>('');
  const [hydration, setHydration] = useState<string>('');
  const [diet, setDiet] = useState<string>('');
  const [extraSleepNotes, setExtraSleepNotes] = useState<string>('');
  const [extraDietNotes, setExtraDietNotes] = useState<string>('');
  const [sleep, setSleep] = useState<number>(0);
  const [userMsg, setUserMsg] = useState<string>('');

  const navigate = useNavigate();

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const originalDate: string = event.target.value;
    setDate(originalDate);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setUserMsg('');
    if (activity === '') {
      setUserMsg("Please specify the activity you're logging");
      return;
    }
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
        hours_slept: sleep,
        diet_hydration_notes: extraDietNotes,
        sleep_stress_notes: extraSleepNotes,
        adventure_id: undefined,
      };
      handlePostingNewAdventure(newAdventureData);

    }
  };
  async function handlePostingNewAdventure(
    newAdventureData: Adventure,
  ): Promise<void> {
    const action = await dispatch(postAdventureAsync(newAdventureData));

    if (postAdventureAsync.fulfilled.match(action)) {
      console.log(action);
    }
    navigate('/home');
  }

  return (
    <>
      <form className='form'>
        <div className='top-line-components'>
          <div>
            <label htmlFor='activity-input'>Activity:</label>
            <input
              type='text'
              name='activity'
              value={activity}
              onChange={(event) => setActivity(event.target.value)}
            />
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
        <p className='user-prompt'>
          Over the last 48 hours, how would you describe the following:
        </p>
        <div className='second-line-components'>
          <select
            name='stressLevel'
            value={stress_level}
            onChange={(event) => setStressLevel(event.target.value)}
          >
            <option value=''>Stress Level:</option>
            <option value='Min'>No stress</option>
            <option value='Low'>Low</option>
            <option value='Moderate'>Moderate</option>
            <option value='High'>High</option>
            <option value='Max'>Max</option>
          </select>
          <select
            name='hydration'
            value={hydration}
            onChange={(event) => setHydration(event.target.value)}
          >
            <option value=''>Hydration Level:</option>
            <option value='Dehydrated'>Dehydrated</option>
            <option value='Somewhat Hydrated'>Somewhat Hydrated</option>
            <option value='Hydrated'>Hydrated</option>
            <option value='Very Hydrated'>Very Hydrated</option>
          </select>
          <select
            name='diet'
            value={diet}
            onChange={(event) => setDiet(event.target.value)}
          >
            <option value=''>Overall Diet:</option>
            <option value='Poor'>Poor</option>
            <option value='Average'>Average</option>
            <option value='Good'>Good</option>
          </select>
          <div>
            <label htmlFor='sleep-input'>Hours slept / night:</label>
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
        <textarea
          className='sleep-notes-input'
          placeholder='Add any extra notes on sleep or stress'
          name='notes'
          value={extraSleepNotes}
          onChange={(event) => setExtraSleepNotes(event.target.value)}
        />
        <textarea
          className='hydro-notes-input'
          placeholder='Add any extra notes on diet or hydration'
          name='notes'
          value={extraDietNotes}
          onChange={(event) => setExtraDietNotes(event.target.value)}
        />
        <textarea
          className='notes-input'
          placeholder='Add any extra notes on any beta '
          name='notes'
          value={betaNotes}
          onChange={(event) => setBetaNotes(event.target.value)}
        />
      </form>
    </>
  );
}

export default LogAdventureForm;
