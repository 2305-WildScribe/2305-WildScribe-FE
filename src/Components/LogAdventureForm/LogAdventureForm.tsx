import { useState, ChangeEvent } from 'react';
import './LogAdventureForm.scss';

function LogAdventureForm() {
  const [activity, setActivity] = useState<string>('');
  const [date, setDate] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [stressLevel, setStressLevel] = useState<number>(1); 
  const [hydration, setHydration] = useState<number>(0);
  const [diet, setDiet] = useState<string>('');

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedDateValue: string = event.target.value;
    setDate(selectedDateValue);
  };

  return (
    <form>
      <label htmlFor='activity-input'>Activity:</label>
      <input 
        type='text'
        name='activity'
        value={activity}
        onChange={event => setActivity(event.target.value)}
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
        value={image}
        onChange={event => setImage(event.target.value)}
      />
      <label htmlFor='stress-level-input'>Stress Level:</label>
      <input
        type='number'
        name='stressLevel'
        value={stressLevel}
        onChange={event => setStressLevel(parseInt(event.target.value, 10))}
        min='1'
        max='10'
      />
      <label htmlFor='hydration-input'>Hydration Level:</label>
      <input
        type='number'
        name='hydration'
        value={hydration}
        onChange={event => setHydration(parseInt(event.target.value))}
        min='0'
      />
      <label htmlFor='diet-input'>How Is Your Diet:</label>
      <input 
        type='text'
        name='diet'
        value={diet}
        onChange={event => setDiet(event.target.value)}
      />
      <label htmlFor='notes-input'>Notes:</label>
      <input 
        type='text'
        name='notes'
        value={notes}
        onChange={event => setNotes(event.target.value)}
      />
    </form>
  )
}

export default LogAdventureForm;