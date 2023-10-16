import { useState, ChangeEvent } from 'react';
import './LogAdventureForm.scss';
import { postNewAdventure } from '../../apiCalls';
import { Adventure } from '../../../types';
import { useNavigate } from 'react-router-dom';

interface LogAdventureFormProps {
  logNewAdventure: (newAdventureData: Adventure) => void;
  adventures: Adventure[];
  setAdventures: React.Dispatch<React.SetStateAction<Adventure[]>>;
}

function LogAdventureForm({
  adventures,
  setAdventures,
}: LogAdventureFormProps): React.ReactElement {
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

  const navigate = useNavigate();
  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDateValue: string = event.target.value;
    setDate(selectedDateValue);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newAdventureData: Adventure = {
      user_id: 12,
      activity,
      date: date || '',
      beta_notes: betaNotes,
      image_url,
      stress_level,
      hydration,
      diet,
      hours_slept: sleep,
      diet_hydration_notes: extraDietNotes,
      sleep_stress_notes: extraSleepNotes,
      adventure_id: undefined,
    };

    postNewAdventure(newAdventureData).then((response) => {
      console.log(response);
      setAdventures([...adventures, newAdventureData]);
      navigate('/');
    });
  };

  return (
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
          <button
            className='submit-button'
            onClick={(event) => handleSubmit(event)}
          >
            Submit
          </button>
        </div>
      </div>
      <p>Over the last 48 hours, how would you describe the following:</p>
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
          <label htmlFor='sleep-input'>Hours slept:</label>
          <input
            type='number'
            name='sleep'
            value={sleep}
            onChange={(event) => setSleep(Number(event.target.value))}
            placeholder=''
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
  );
}

export default LogAdventureForm;
