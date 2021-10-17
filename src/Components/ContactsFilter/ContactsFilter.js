import s from './ContactsFilter.module.css';

export default function Filter({ value, onChange }) {
  return (
    <div className={s.container}>
      <label className={s.label}>
        Filter by name
        <input
          className={s.input}
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
