import { ReactElement, useState } from 'react'

import styles from './UserSearch.module.scss'

interface Props {
    search: Function
}

export default function UserSearch({ search }: Props): ReactElement {
    const [searchValue, setSearchValue] = useState('');
    return (
        <div className={styles.UserSearch + " text-field text-field--with-button"}>
            <input
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                if (e.code === "Enter" && searchValue) {
                    e.preventDefault();
                    search(searchValue);
                }
            }} />
            <button className="button button--with-icon" disabled={!searchValue} onClick={() => search(searchValue)}>
                <span className="material-icons">search</span>
            </button>
        </div>
    )
}
