import * as React from 'react';
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {visuallyHidden} from '@mui/utils';
import {Link} from "react-router-dom";

function createData(performances) {
    const rows = performances.map((performance) => {
        const {
            set1_position,
            set2_position,
            set3_position,
            set4_position,
            set5_position,
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
        } = performance;

        const match = performance.match.team1_name + " vs " + performance.match.team2_name;
        const team = performance.team.name;
        const match_id = performance.match.id
        const team_id = performance.team.id


        return {
            match,
            match_id,
            team,
            team_id,
            set1_position,
            set2_position,
            set3_position,
            set4_position,
            set5_position,
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


function sumData(rows) {
    let sumPoints = 0, sumBalance = 0, sumServe = 0, sumServeError = 0,
        sumServeAce = 0, sumReception = 0, sumPositiveReception = 0, sumReceptionError = 0,
        sumSpike = 0, sumSpikePoint = 0, sumSpikeBlock = 0, sumSpikeError = 0,
        sumBlock = 0, sumDig = 0;
    rows.map((row) => {
        sumPoints = sumPoints + row.total_score
        sumBalance = sumBalance + row.total_score_balance
        sumServe = sumServe + row.serve
        sumServeError = sumServeError + row.serve_error
        sumServeAce = sumServeAce + row.serve_ace
        sumReception = sumReception + row.reception
        sumPositiveReception = sumPositiveReception + row.positive_reception
        sumReceptionError = sumReceptionError + row.reception_error
        sumSpike = sumSpike + row.spike
        sumSpikePoint = sumSpikePoint + row.spike_point
        sumSpikeBlock = sumSpikeBlock + row.spike_block
        sumSpikeError = sumSpikeError + row.spike_error
        sumBlock = sumBlock + row.block_amount
        sumDig = sumDig + row.dig
    })

    const avgPositiveReception = Math.round((sumPositiveReception / sumReception) * 100)
    const avgSpikeKillPercentage = Math.round((sumSpikePoint / sumSpike) * 100)
    const avgSpikeEfficiency = Math.round(((sumSpikePoint - sumSpikeError - sumSpikeBlock) / sumSpike) * 100)

    return ({
        sumPoints,
        sumBalance,
        sumServe,
        sumServeError,
        sumServeAce,
        sumReception,
        sumPositiveReception,
        sumReceptionError,
        avgPositiveReception: isNaN(avgPositiveReception) ? 0 : avgPositiveReception,
        sumSpike,
        sumSpikePoint,
        sumSpikeBlock,
        sumSpikeError,
        avgSpikeKillPercentage: isNaN(avgSpikeKillPercentage) ? 0 : avgSpikeKillPercentage,
        avgSpikeEfficiency: isNaN(avgSpikeEfficiency) ? 0 : avgSpikeEfficiency,
        sumBlock,
        sumDig
    })
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
        id: 'match',
        numeric: false,
        disablePadding: true,
        label: 'Mecz',
    },
    {
        id: 'team',
        numeric: false,
        disablePadding: true,
        label: 'Drużyna',
    },
    {
        id: 'set1_position',
        numeric: true,
        disablePadding: false,
        label: 'I',
    },
    {
        id: 'set2_position',
        numeric: true,
        disablePadding: false,
        label: 'II',
    },
    {
        id: 'set3_position',
        numeric: true,
        disablePadding: false,
        label: 'III',
    },
    {
        id: 'set4_position',
        numeric: true,
        disablePadding: false,
        label: 'IV',
    },
    {
        id: 'set5_position',
        numeric: true,
        disablePadding: false,
        label: 'V',
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
    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell align="center" colSpan={2}></TableCell>
                <TableCell align="center" colSpan={5}>Set</TableCell>
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
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
            }}
        >
            <Typography
                sx={{flex: '1 1 100%'}}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {tableName}
            </Typography>
        </Toolbar>
    );
}

function TableSummary({rows}) {
    const dataSummary = sumData(rows)
    return (
        <TableRow>
            <TableCell align={"right"} colSpan={8}>Łącznie:</TableCell>
            <TableCell align="right">{dataSummary.sumPoints}</TableCell>
            <TableCell align="right">{dataSummary.sumBalance}</TableCell>
            <TableCell align="right">{dataSummary.sumServe}</TableCell>
            <TableCell align="right">{dataSummary.sumServeError}</TableCell>
            <TableCell align="right">{dataSummary.sumServeAce}</TableCell>
            <TableCell align="right">{dataSummary.sumReception}</TableCell>
            <TableCell align="right">{dataSummary.sumPositiveReception}</TableCell>
            <TableCell align="right">{dataSummary.sumReceptionError}</TableCell>
            <TableCell align="right">{dataSummary.avgPositiveReception}%</TableCell>
            <TableCell align="right">{dataSummary.sumSpike}</TableCell>
            <TableCell align="right">{dataSummary.sumSpikePoint}</TableCell>
            <TableCell align="right">{dataSummary.sumSpikeBlock}</TableCell>
            <TableCell align="right">{dataSummary.sumSpikeError}</TableCell>
            <TableCell align="right">{dataSummary.avgSpikeKillPercentage}%</TableCell>
            <TableCell align="right">{dataSummary.avgSpikeEfficiency}%</TableCell>
            <TableCell align="right">{dataSummary.sumBlock}</TableCell>
            <TableCell align="right">{dataSummary.sumDig}</TableCell>
        </TableRow>
    );
}

export default function PlayerLastPerformancesTable({performances, tableName}) {
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
        <Box sx={{width: '100%'}}>
            {performances.length > 0 ? (
                    <Paper sx={{width: '100%', mb: 2}}>

                        <EnhancedTableToolbar tableName={tableName}/>
                        <TableContainer>
                            <Table
                                sx={{minWidth: 750}}
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
                                                sx={{cursor: 'pointer'}}
                                            >
                                                <TableCell>
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <Link to={`/details/match/${row.match_id}`}>{row.match}</Link>
                                                </TableCell>
                                                <TableCell><Link
                                                    to={`/details/team/${row.team_id}`}>{row.team}</Link></TableCell>
                                                <TableCell align="right">{row.set1_position}</TableCell>
                                                <TableCell align="right">{row.set2_position}</TableCell>
                                                <TableCell align="right">{row.set3_position}</TableCell>
                                                <TableCell align="right">{row.set4_position}</TableCell>
                                                <TableCell align="right">{row.set5_position}</TableCell>
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
                                                <TableCell align="right">{row.spike_kill_percentage}%</TableCell>
                                                <TableCell align="right">{row.spike_efficiency}%</TableCell>
                                                <TableCell align="right">{row.block_amount}</TableCell>
                                                <TableCell align="right">{row.dig}</TableCell>
                                                <TableCell align="right"></TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    <TableSummary rows={rows}></TableSummary>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                ) :
                (
                    <h1>Zawodnik nie wystąpił jeszcze w żadnym meczu</h1>
                )
            }

        </Box>
    );
}