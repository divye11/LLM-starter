import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { Input } from '@geist-ui/core';
import { CornerDownLeft } from '@geist-ui/icons'

const Searchbox: React.FC<SearchboxProps> = ({ disabled, sendMessage }) => {
   const [search, setSearch] = useState('');
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      if (inputRef.current) {
         inputRef.current.focus();
      }
   }, []);

   const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);
   }

   const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         sendMessage(search);
      }
   }

   return (
      <Input
         disabled={disabled}
         crossOrigin={'anonymous'}
         iconRight={
         <CornerDownLeft 
            style={{ cursor: 'pointer' }} 
            color="white" 
            onClick={() => {
               sendMessage(search);
            }}
         />}
         ref={inputRef}
         width={40} 
         placeholder='How do cycles work?' 
         onPointerEnterCapture={() => {}} 
         onPointerLeaveCapture={() => {}} 
         value={search}
         onChange={handleQuery}
         style={{
            color:'white',
            fontSize: '1em',
         }}
         scale={4/3}
         font='1.2em'
         onKeyDown={onKeyDown}
      />
   );
}

export default Searchbox;