import { Button } from './Button'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: PropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    
    const addItemHandler = () => {
        if (!title.trim()) {
			setError('Title is required');
			setTitle('')
			return;
		}

		if (isTitleValid) {
			addItem(title.trim())
			setTitle('')
		}
    }

    const isTitleValid = title.length < 16;
    
    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    
    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
                placeholder='max length 15'
				maxLength={15}
            />
            <Button title={'+'} onClick={addItemHandler} isDisabled={!isTitleValid}/>
            {!isTitleValid && <div className={'error-message'}>Max length is 15</div>}
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}
