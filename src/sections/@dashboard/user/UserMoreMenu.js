import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import {db} from '../../../Firebase/fbconfig'
// ----------------------------------------------------------------------

export default function UserMoreMenu({data , count , setCount , collection, id}) {
  const ref = useRef(null);
  const [isPending,setIsPending]=useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const handleClick=async()=>{
   if(window.confirm("Are you sure want to delete"))
   {
    
    setIsPending(true)
    await deleteDoc(doc(db, collection,id))
    .then(()=>{
      setCount(count+1)
      alert("Deleted")
      setIsOpen(false)
    }).catch((err)=>{
      alert(err)
      setIsOpen(false);
    }).finally(()=>{
    setIsPending(true) 
    })
  }
  else{
    setIsOpen(false);
  }

  }
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disabled={isPending} onClick={handleClick}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon >
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
