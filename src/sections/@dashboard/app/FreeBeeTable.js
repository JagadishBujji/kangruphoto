import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState ,useEffect} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { collection, getDocs } from 'firebase/firestore';
import {db} from '../../../Firebase/fbconfig'
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../user';
// mock
import USERLIST from '../../../_mock/user';

// ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'dateandtime', label: 'Date and Time', alignRight: false },
//   { id: 'name', label: ' Name ', alignRight: false },
//   { id: 'company', label: 'Event Type', alignRight: false },
//   { id: 'role', label: 'Gears List', alignRight: false },
//   { id: 'location', label: 'Location', alignRight: false },
//   { id: 'status', label: 'No of recruiter', alignRight: false },

//   { id: 'isVerified', label: 'Event Status', alignRight: false },
//   { id: 'isVerified', label: 'Payment Status', alignRight: false },
//   { id: 'eventprice', label: 'Event Price', alignRight: false },
// ];
const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false }, 
  { id: 'service', label: 'Service', alignRight: false }, 
  { id: 'experience', label: 'Experience', alignRight: false },  
  { id: 'video_gear', label: 'Video gear', alignRight: false }, 
  { id: 'description', label: 'Description', alignRight: false }, 
  { id: 'price', label: 'Price', alignRight: false }, 
  { id: 'section', label: 'section', alignRight: false } 
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

export default function FreeBeeTable() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
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

  const navigate = useNavigate();

  const [count, setCount] = useState(0)
  const [freeBee, setFreeBee] = useState();
  const [displayData, setDisplayData] = useState();

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "freebie_post"));
      const arr = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        const obj = {
          doc_id: doc.id,
          ...data
        }
        arr.push(obj)
      });
      setFreeBee(arr);
      setDisplayData(arr)
    }
    getData()
  }, [count])
  console.log(freeBee)

  return (
    <Page title="User">
      <Card sx={{ padding: '20px' }}>
        {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          FreeBee
        </Typography>
        <Scrollbar sx={{ padding: '20px' }}>
          <TableContainer sx={{ minWidth: 1800 }}>
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
                {displayData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  // const { id, name, role, status, company, avatarUrl, isVerified } = row;
                  const isItemSelected = selected.indexOf(row.title) !== -1;

                  return (
                    <TableRow
                      hover
                      key={row.doc_id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                      onClick={() => navigate(`/dashboard/freebee/${row.doc_id}`)}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                      </TableCell> */}
                      <TableCell sx={{ color: 'gray' }} align="left" padding="checkbox">
                      {row.title?row.title:""}
                         
                      </TableCell>

                      <TableCell sx={{ color: 'gray' }} component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {/* <Avatar alt={name} src={avatarUrl} /> */}
                          <Typography variant="subtitle2" noWrap>
                            {row.service?row.service.map((fs)=>`${fs} `):""}
                          </Typography>
                        </Stack>
                      </TableCell>
                     <TableCell sx={{ color: 'gray' }} align="left">{row.experience?row.experience:""}</TableCell>
                      <TableCell sx={{ color: 'gray' }} align="left"> 
                      {row.video_gear ? row.video_gear.map((gs, index) => (
                         <li> {gs} </li>
                )) : ""}
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }} align="left">{row.description?row.description:""}</TableCell> 
                      <TableCell sx={{ color: 'gray' }} align="left">{row?.price}</TableCell> 
                      <TableCell sx={{ color: 'gray' }} align="left">{row?.section}</TableCell> 

                      {/* <TableCell sx={{ color: 'gray' }} align="left">
                        <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                          {sentenceCase(status)}
                        </Label>
                      </TableCell>
                      <TableCell sx={{ color: 'gray' }} align="left">
                        <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                          {sentenceCase(status)}
                        </Label>
                      </TableCell> */}
                        
                      <TableCell onClick={(e)=>e.stopPropagation()} sx={{ color: 'gray' }} align="right">
                        <UserMoreMenu collection="freebie_post"  id={row.doc_id}/>
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
    </Page>
  );
}
