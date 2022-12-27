import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import {db} from '../Firebase/fbconfig'

import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sno', label: '', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'phone_number', label: 'Phone number', alignRight: false },
  { id: 'alternative_no', label: 'Alternative number', alignRight: false },
  { id: 'aadhar_card', label: 'Aadhar', alignRight: false },
  { id: 'blood_group', label: 'Blood group', alignRight: false },
  { id: 'district', label: 'District', alignRight: false },
  { id: 'education', label: 'Education', alignRight: false },
  { id: 'experience', label: 'Experience', alignRight: false },
  { id: 'landline_no', label: 'Landline number', alignRight: false },
  { id: 'language', label: 'Language', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
  { id: 'owner_name', label: 'Owner Name', alignRight: false },
  { id: 'pan_card', label: 'Pan card', alignRight: false },
  { id: 'specialist', label: 'Specialist', alignRight: false },
  { id: 'studio_location', label: 'Studio Location', alignRight: false },
  { id: 'studio_name', label: 'Studio Name', alignRight: false },
  { id: 'studio_services', label: 'Studio services', alignRight: false }, 
  { id: 'total_labours', label: 'Total labours', alignRight: false }, 


  
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [oBy,setOBy]=useState(true)
  const handleRequestSort = (event, property) => {
    console.log(property)
    setOBy(!oBy)
    if(property==='name')
    {
      if(oBy)
      { 
        const sortedObjs = users.sort((a, b) => a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1);
        console.log(sortedObjs)
      }
      else{
        const sortedObjs = users.sort((a, b) => a.username.toLowerCase() < b.username.toLowerCase() ? 1 : -1);
        console.log(sortedObjs)
      }
    }

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;
  const [count,setCount]=useState(0)
  const [users,setUsers]=useState();
  const [displayData,setDisplayData]=useState();
  // console.log(selected)
  useEffect(()=>{
    const getData=async()=>{
      const querySnapshot = await getDocs(collection(db, "UserDetails"));
      const arr=[]
      querySnapshot.forEach((doc) => {
        const data=doc.data()
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const obj={
          doc_id:doc.id,
          ...data
        }
        arr.push(obj)
      });
      setUsers(arr);
      setDisplayData(arr)
    }
    getData()
  },[count])
  console.log(users)
  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar users={users} setUsers={setDisplayData}  setSelected={setSelected} setCount={setCount} count={count} selected={selected} numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
          {displayData?.length===0 &&  <p> No data available </p>}

                  {displayData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {   username } = row;
                    const isItemSelected = selected.indexOf(row.doc_id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={row.doc_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, row.doc_id)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={username} src={row.profile_pic?row.profile_pic:""} />
                            <Typography variant="subtitle2" noWrap>
                              {username}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{row.email?row.email:""}</TableCell>
                        <TableCell align="left">{row.address?row.address:""}</TableCell>
                        <TableCell align="left">{row.gender?row.gender:""}</TableCell>
                        <TableCell align="left">{row.phone_number?row.phone_number:""}</TableCell>
                        <TableCell align="left">{row.alternative_no?row.alternative_no:""}</TableCell>
                        <TableCell align="left">{row.aadhar_card?row.aadhar_card:""}</TableCell>
                        <TableCell align="left">{row.blood_group?row.blood_group:""}</TableCell>
                        <TableCell align="left">{row.district?row.district:""}</TableCell>
                        <TableCell align="left">{row.education?row.education:""}</TableCell>
                        <TableCell align="left">{row.experience?row.experience:""}</TableCell>
                        <TableCell align="left">{row.landline_no?row.landline_no:""}</TableCell>
                        <TableCell align="left">{row.language?row.language:""}</TableCell>
                        <TableCell align="left">{row.location?`${row.location._lat},${row.location._long}`:""}</TableCell>
                        <TableCell align="left">{row.owner_name?row.owner_name:""}</TableCell>
                        <TableCell align="left">{row.pan_card?row.pan_card:""}</TableCell>
                        <TableCell align="left">{row.specialist?row.specialist:""}</TableCell>
                        <TableCell align="left">{row.studio_location?row.studio_location:""}</TableCell>
                        <TableCell align="left">{row.studio_name?row.studio_name:""}</TableCell>
                        <TableCell align="left">{row.studio_services?row.studio_services:""}</TableCell>
                        <TableCell align="left">{row.total_labours?row.total_labours:""}</TableCell>
                         
                        {/* <TableCell align="left">
                          <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell> */}

                        <TableCell align="right">
                          <UserMoreMenu count={count} setCount={setCount} collection="UserDetails" id={row.doc_id} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
