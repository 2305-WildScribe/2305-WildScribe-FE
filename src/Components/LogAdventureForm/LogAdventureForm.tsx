import { useState, ChangeEvent } from 'react';
import './LogAdventureForm.scss';

function LogAdventureForm(): React.ReactElement {
  const [activity, setActivity] = useState<string>('');
  const [date, setDate] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [stressLevel, setStressLevel] = useState<number>(0);
  const [hydration, setHydration] = useState<number>(0);
  const [diet, setDiet] = useState<string>('');

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = (event.target.files as FileList)[0];
    if (file) {
      setImage(file);
    }
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDateValue: string = event.target.value;
    setDate(selectedDateValue);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newAdventure = {
      activity,
      date,
      notes,
      image,
      stressLevel,
      hydration,
      diet,
    };
    console.log(newAdventure);
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
            type='file'
            name='image'
            accept='image/*'
            onChange={handleImageUpload}
            multiple={false}
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
      <div className='second-line-components'>
        <div>
          <label htmlFor='stress-level-input'>Stress Level:</label>
          <select
            name='stressLevel'
            value={stressLevel}
            onChange={(event) => setStressLevel(parseInt(event.target.value))}
          >
            <option value='1'>Min</option>
            <option value='2'>Low</option>
            <option value='3'>Moderate</option>
            <option value='4'>High</option>
            <option value='5'>Max</option>
          </select>
        </div>
        <div>
          <label htmlFor='hydration-input'>Hydration Level:</label>
          <select
            name='hydration'
            value={hydration}
            onChange={(event) => setHydration(parseInt(event.target.value))}
          >
            <option value='1'>Dehydrated</option>
            <option value='2'>Somewhat Hydrated</option>
            <option value='3'>Hydrated</option>
            <option value='4'>Very Hydrated</option>
          </select>
        </div>
        <div>
          <label htmlFor='diet-input'>How Is Your Diet:</label>
          <select
            name='diet'
            value={diet}
            onChange={(event) => setDiet(event.target.value)}
          >
            <option value='poor'>Poor</option>
            <option value='average'>Average</option>
            <option value='good'>Good</option>
          </select>
        </div>
      </div>
      <textarea
        className='notes-input'
        placeholder='Log your notes here'
        name='notes'
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
    </form>
  );
}

export default LogAdventureForm;
