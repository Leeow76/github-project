import { ReactElement, useState } from 'react'

interface Props {
    search: Function
}

export default function UserSearch({ search }: Props): ReactElement {
    const [searchValue, setSearchValue] = useState('');
    return (
        <>
            <input
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                if (e.code === "Enter" && searchValue) {
                    e.preventDefault();
                    search(searchValue);
                }
            }} />
          <button disabled={!searchValue} onClick={() => search(searchValue)}>Search</button>
        </>
    )
}
