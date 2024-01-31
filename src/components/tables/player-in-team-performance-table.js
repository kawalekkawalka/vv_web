import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import {Link} from "react-router-dom";

function createData(performances) {
  const rows = performances.map((performance) => {

    const player_id = performance.player.id;
    const name = performance.player.name + " " + performance.player.surname;
    const set_amount = performance.set_amount;
    const total_score = performance.results.total_score;
    const total_score_balance = performance.results.total_score_balance;
    const serve = performance.results.serve;
    const serve_error = performance.results.serve_error;
    const serve_ace = performance.results.serve_ace;
    const reception = performance.results.reception;
    const positive_reception = performance.results.positive_reception;
    const reception_error = performance.results.reception_error;
    const positive_reception_percentage = performance.results.positive_reception_percentage;
    const spike = performance.results.spike;
    const spike_point = performance.results.spike_point;
    const spike_block = performance.results.spike_block;
    const spike_error = performance.results.spike_error;
    const spike_kill_percentage = performance.results.spike_kill_percentage;
    const spike_efficiency = performance.results.spike_efficiency;
    const block_amount = performance.results.block_amount;
    const dig = performance.results.dig;

    return {
      id:player_id,
      name,
      set_amount,
      total_score,
      total_score_balance,
      serve,
      serve_error,
      serve_ace,
      reception,
      positive_reception,
      reception_error,
      positive_reception_percentage,
      spike,
      spike_point,
      spike_block,
      spike_error,
      spike_kill_percentage,
      spike_efficiency,
      block_amount,
      dig,
    };
  });
  return rows;
}

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

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Zawodnik',
  },
  {
    id: 'set_amount',
    numeric: true,
    disablePadding: true,
    label: 'Sety',
  },
  {
    id: 'total_score',
    numeric: true,
    disablePadding: false,
    label: 'suma',
  },
  {
    id: 'total_score_balance',
    numeric: true,
    disablePadding: false,
    label: 'balans',
  },
  {
    id: 'serve',
    numeric: true,
    disablePadding: false,
    label: 'liczba',
  },
  {
    id: 'serve_error',
    numeric: true,
    disablePadding: false,
    label: 'bł',
  },
  {
    id: 'serve_ace',
    numeric: true,
    disablePadding: false,
    label: 'as',
  },
  {
    id: 'reception',
    numeric: true,
    disablePadding: false,
    label: 'liczba',
  },
  {
    id: 'positive_reception',
    numeric: true,
    disablePadding: false,
    label: 'poz',
  },
  {
    id: 'reception_error',
    numeric: true,
    disablePadding: false,
    label: 'bł',
  },
  {
    id: 'positive_reception_percentage',
    numeric: true,
    disablePadding: false,
    label: 'poz%',
  },
  {
    id: 'spike',
    numeric: true,
    disablePadding: false,
    label: 'liczba',
  },
  {
    id: 'spike_point',
    numeric: true,
    disablePadding: false,
    label: 'pkt',
  },
  {
    id: 'spike_block',
    numeric: true,
    disablePadding: false,
    label: 'blok',
  },
  {
    id: 'spike_error',
    numeric: true,
    disablePadding: false,
    label: 'bł',
  },
  {
    id: 'spike_kill_percentage',
    numeric: true,
    disablePadding: false,
    label: 'skut%',
  },
  {
    id: 'spike_efficiency',
    numeric: true,
    disablePadding: false,
    label: 'eff%',
  },
  {
    id: 'block_amount',
    numeric: true,
    disablePadding: false,
    label: 'bloki',
  },
  {
    id: 'dig',
    numeric: true,
    disablePadding: false,
    label: 'obrony',
  },

];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
              <TableCell align="center" colSpan={3}></TableCell>
              <TableCell align="center" colSpan={2}>Punkty</TableCell>
              <TableCell align="center" colSpan={3}>Zagrywka</TableCell>
              <TableCell align="center" colSpan={4}>Przyjęcie</TableCell>
              <TableCell align="center" colSpan={6}>Atak</TableCell>
              <TableCell align="center" colSpan={2}>Obrona</TableCell>
            </TableRow>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={'none'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar({tableName}) {

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableName}
        </Typography>
    </Toolbar>
  );
}

export default function PlayerInTeamPerformanceTable({performances, tableName}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [dense, setDense] = React.useState(true);
  const rows = createData(performances)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy],
  );

  return (
    <Box sx={{ width: '100%'}}>
      <Paper sx={{ width: '100%', mb: 2 }}>

        <EnhancedTableToolbar tableName={tableName}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />

            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <Link to={`/details/player/${row.id}`}>{row.name}</Link>
                    </TableCell>
                    <TableCell align="right">{row.set_amount}</TableCell>
                    <TableCell align="right">{row.total_score}</TableCell>
                    <TableCell align="right">{row.total_score_balance}</TableCell>
                    <TableCell align="right">{row.serve}</TableCell>
                    <TableCell align="right">{row.serve_error}</TableCell>
                    <TableCell align="right">{row.serve_ace}</TableCell>
                    <TableCell align="right">{row.reception}</TableCell>
                    <TableCell align="right">{row.positive_reception}</TableCell>
                    <TableCell align="right">{row.reception_error}</TableCell>
                    <TableCell align="right">{row.positive_reception_percentage}</TableCell>
                    <TableCell align="right">{row.spike}</TableCell>
                    <TableCell align="right">{row.spike_point}</TableCell>
                    <TableCell align="right">{row.spike_block}</TableCell>
                    <TableCell align="right">{row.spike_error}</TableCell>
                    <TableCell align="right">{row.spike_kill_percentage}</TableCell>
                    <TableCell align="right">{row.spike_efficiency}</TableCell>
                    <TableCell align="right">{row.block_amount}</TableCell>
                    <TableCell align="right">{row.dig}</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}