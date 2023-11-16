import './EditLogForm.scss';
import { Adventure } from '../../types';
import { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAdventures } from '../../Context/AdventureContext';
import { useAppDispatch } from '../../Redux/hooks';
import { editAdventureAsync } from '../../Redux/slices/AsyncThunks';

function EditLogForm(): React.ReactElement {
  const {

    setSingleAdventure,
    singleAdventure,
    user_id,
  } = useAdventures();

  const dispatch = useAppDispatch();

  const [updatedActivity, setUpdatedActivity] = useState<string>(
    singleAdventure ? singleAdventure.activity : '',
  );
  const [updatedDate, setUpdatedDate] = useState<string | null>(
    singleAdventure ? singleAdventure.date : null,
  );
  const [updatedBetaNotes, setUpdatedBetaNotes] = useState<string>(
    singleAdventure ? singleAdventure.beta_notes : '',
  );
  const [updatedImage_url, setUpdatedImage] = useState<string>(
    singleAdventure ? singleAdventure.image_url : '',
  );
  const [updatedStress_level, setUpdatedStressLevel] = useState<string>(
    singleAdventure ? singleAdventure.stress_level : '',
  );
  const [updatedHydration, setUpdatedHydration] = useState<string>(
    singleAdventure ? singleAdventure.hydration : '',
  );
  const [updatedDiet, setUpdatedDiet] = useState<string>(
    singleAdventure ? singleAdventure.diet : '',
  );
  const [updatedExtraSleepNotes, setUpdatedExtraSleepNotes] = useState<string>(
    singleAdventure ? singleAdventure.sleep_stress_notes : '',
  );
  const [updatedExtraDietNotes, setUpdatedExtraDietNotes] = useState<string>(
    singleAdventure ? singleAdventure.diet_hydration_notes : '',
  );
  const [updatedSleep, setUpdatedSleep] = useState<number>(
    singleAdventure ? singleAdventure.hours_slept : 0,
  );

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const originalDate: string = event.target.value;
    setUpdatedDate(originalDate);
  };

  useEffect(() => {
    const parsedDate = dayjs(updatedDate);
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    setUpdatedDate(formattedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleSaveChanges = (event: React.FormEvent) => {
    event.preventDefault();
    const parsedDate = dayjs(updatedDate);
    const formattedDate = parsedDate.format('MM/DD/YYYY');

    const updatedLog: Adventure = {
      user_id: singleAdventure ? singleAdventure.user_id : user_id,
      adventure_id: singleAdventure?.adventure_id || undefined,
      activity: updatedActivity || '',
      date: formattedDate || '',
      image_url: updatedImage_url || '',
      stress_level: updatedStress_level || '',
      hours_slept: updatedSleep || 0,
      sleep_stress_notes: updatedExtraSleepNotes || '',
      hydration: updatedHydration || '',
      diet: updatedDiet || '',
      diet_hydration_notes: updatedExtraDietNotes || '',
      beta_notes: updatedBetaNotes || '',
    };
    dispatch(editAdventureAsync(updatedLog));
    setSingleAdventure(undefined);
    navigate('/home');
  };

  return (
    <form className='form'>
      <div className='top-line-components'>
        <div>
          <label htmlFor='activity-input'>Activity:</label>
          <input
            type='text'
            name='activity'
            value={updatedActivity}
            onChange={event => setUpdatedActivity(event.target.value)}
          />
          <label htmlFor='date-input'>Date:</label>
          <input
            type='date'
            name='date'
            value={updatedDate || ''}
            onChange={handleDateChange}
            max={new Date().toISOString().split('T')[0]}
          />
          <label htmlFor='image'>Add Image:</label>
          <input
            type='text'
            name='image'
            value={updatedImage_url}
            onChange={event => setUpdatedImage(event.target.value)}
            placeholder='Enter the image URL'
          />
        </div>
        <div className='form-btn-wrapper'>
          <button
            className='submit-button'
            onClick={event => handleSaveChanges(event)}
          >
            Save Changes
          </button>
        </div>
      </div>
      <p className='user-prompt'>
        Over the last 48 hours, how would you describe the following:
      </p>
      <div className='second-line-components'>
        <select
          name='stressLevel'
          value={updatedStress_level}
          onChange={event => setUpdatedStressLevel(event.target.value)}
        >
          <option value=''>Stress Level:</option>
          <option value='Min'>No stress</option>
          <option value='Low'>Low</option>
          <option value='Moderate'>Moderate</option>
          <option value='High'>High</option>
          <option value='Max'>Max</option>
        </select>
        <select
          name='updatedHydration'
          value={updatedHydration}
          onChange={event => setUpdatedHydration(event.target.value)}
        >
          <option value=''>Hydration Level:</option>
          <option value='Dehydrated'>Dehydrated</option>
          <option value='Somewhat Hydrated'>Somewhat Hydrated</option>
          <option value='Hydrated'>Hydrated</option>
          <option value='Very Hydrated'>Very Hydrated</option>
        </select>
        <select
          name='diet'
          value={updatedDiet}
          onChange={event => setUpdatedDiet(event.target.value)}
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
            value={updatedSleep}
            onChange={event => {
              setUpdatedSleep(Number(event.target.value));
            }}
            min='0'
          />
        </div>
      </div>
      <textarea
        className='sleep-notes-input'
        placeholder='Add any extra notes on sleep or stress'
        name='notes'
        value={updatedExtraSleepNotes}
        onChange={event => setUpdatedExtraSleepNotes(event.target.value)}
      />
      <textarea
        className='hydro-notes-input'
        placeholder='Add any extra notes on diet or Hydration'
        name='notes'
        value={updatedExtraDietNotes}
        onChange={event => setUpdatedExtraDietNotes(event.target.value)}
      />
      <textarea
        className='notes-input'
        placeholder='Add any extra notes on any beta '
        name='notes'
        value={updatedBetaNotes}
        onChange={event => setUpdatedBetaNotes(event.target.value)}
      />
    </form>
  );
}

export default EditLogForm;
