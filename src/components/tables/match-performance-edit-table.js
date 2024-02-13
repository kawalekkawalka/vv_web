import React, {useCallback, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import MaterialTable, {MTableToolbar} from 'material-table';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {useFetchTeam} from "../../hooks/fetch-team";
import MenuItem from "@mui/material/MenuItem";
import {createTheme, Select, ThemeProvider} from "@mui/material";
import Button from "@mui/material/Button";
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import {useFetchPerformances} from "../../hooks/fetch-performances";

const tableTheme = createTheme({});

export default function MatchPerformanceEditTable({tableIndex, teamId, tableData, onServerSynchronize}) {
    const {id} = useParams();
    const [data, setData] = useState(JSON.parse(localStorage.getItem(`team${tableIndex}PerformanceData_${id}`)) || '')
    const [team] = useFetchTeam(teamId);

    useEffect(() => {
        if (team && data === '') {
            const playerData = team.players.map((player) => ({
                id: player.id,
                player: `${player.name} ${player.surname}`,
            }));
            setData(playerData);
        }
    }, [team]);

    useEffect(() => {
        if (data !== null && data !== undefined) {
            tableData(data);
        }
    }, [data]);

    const columns = [
        {
            title: "Zawodnik",
            field: "player",
            cellStyle: {
                backgroundColor: '#f2f2f2',
                fontSize: '13px',
            },
            editable: false,
            render: (rowData) => (
                <Link to={`/details/player/${rowData.id}`}>
                    {rowData.player}
                </Link>
            ),
        },
        {
            title: "I",
            field: "set1_position",
            editable: false,
            render: (rowData) => (
                <Select
                    value={rowData.set1_position}
                    sx={{color: 'black'}}
                    defaultValue={null}
                    onChange={(e) => handleSelectChange(rowData, "set1_position", e.target.value)}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>L</MenuItem>
                    <MenuItem value={8}>*</MenuItem>
                    <MenuItem value={null}></MenuItem>
                </Select>
            )
        },
        {
            title: "II",
            field: "set2_position",
            editable: false,
            cellStyle: {
                backgroundColor: '#f2f2f2',
            },
            render: (rowData) => (
                <Select
                    value={rowData.set2_position}
                    sx={{color: 'black'}}
                    defaultValue={null}
                    onChange={(e) => handleSelectChange(rowData, "set2_position", e.target.value)}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>L</MenuItem>
                    <MenuItem value={8}>*</MenuItem>
                    <MenuItem value={null}></MenuItem>
                </Select>
            )
        },
        {
            title: "III",
            field: "set3_position",
            editable: false,
            render: (rowData) => (
                <Select
                    value={rowData.set3_position}
                    sx={{color: 'black'}}
                    defaultValue={null}
                    onChange={(e) => handleSelectChange(rowData, "set3_position", e.target.value)}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>L</MenuItem>
                    <MenuItem value={8}>*</MenuItem>
                    <MenuItem value={null}></MenuItem>
                </Select>
            )
        },
        {
            title: "IV",
            field: "set4_position",
            editable: false,
            cellStyle: {
                backgroundColor: '#f2f2f2',
            },
            render: (rowData) => (
                <Select
                    value={rowData.set4_position}
                    sx={{color: 'black'}}
                    defaultValue={null}
                    onChange={(e) => handleSelectChange(rowData, "set4_position", e.target.value)}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>L</MenuItem>
                    <MenuItem value={8}>*</MenuItem>
                    <MenuItem value={null}></MenuItem>
                </Select>
            )
        },
        {
            title: "V",
            field: "set5_position",
            editable: false,
            render: (rowData) => (
                <Select
                    value={rowData.set5_position}
                    sx={{color: 'black'}}
                    defaultValue={null}
                    onChange={(e) => handleSelectChange(rowData, "set5_position", e.target.value)}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>L</MenuItem>
                    <MenuItem value={8}>*</MenuItem>
                    <MenuItem value={null}></MenuItem>
                </Select>
            )
        },
        {
            title: "zag",
            field: "serve",
            cellStyle: {
                backgroundColor: '#f2f2f2',
            },
            render: (rowData) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    {rowData.serve || 0}
                    <p>&nbsp;</p>
                    <AddCircleOutlineIcon className="hover-icon" onClick={() => handleServeIncrement(rowData)}/>
                </div>
            ),
        },
        {
            title: "zag_bł",
            field: "serve_error",
            render: (rowData) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    {rowData.serve_error || 0}
                    <p>&nbsp;</p>
                    <AddCircleOutlineIcon className="hover-icon" onClick={() => handleServeErrorIncrement(rowData)}/>
                </div>
            ),
        },
        {
            title: "zag_as",
            field: "serve_ace",
            cellStyle: {
                backgroundColor: '#f2f2f2',
            },
            render: (rowData) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    {rowData.serve_ace || 0}
                    <p>&nbsp;</p>
                    <AddCircleOutlineIcon className="hover-icon" onClick={() => handleServeAceIncrement(rowData)}/>
                </div>
            ),
        },
        {
            title: "przyj",
            field: "reception",
            render: (rowData) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    {rowData.reception || 0}
                    <p>&nbsp;</p>
                    <AddCircleOutlineIcon className="hover-icon" onClick={() => handleReceptionIncrement(rowData)}/>
                </div>
            ),
        },
        {
            title: "przyj+",
            field: "positive_reception",
            cellStyle: {
                backgroundColor: '#f2f2f2',
            },
            render: (rowData) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    {rowData.positive_reception || 0}
                    <p>&nbsp;</p>
                    <AddCircleOutlineIcon className="hover-icon"
                                          onClick={() => handlePositiveReceptionIncrement(rowData)}/>
                </div>
            ),
        },
        {
            title: "przyj_bł",
            field: "reception_error",
            render: (rowData) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    {rowData.reception_error || 0}
                    <p>&nbsp;</p>
                    <AddCircleOutlineIcon className="hover-icon"
                                          onClick={() => handleReceptionErrorIncrement(rowData)}/>
                </div>
            ),
        },
        {
            title: "atak",
            field: "spike",
            cellStyle: {
                backgroundColor: '#f2f2f2',
            },
            render: (rowData) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    {rowData.spike || 0}
                    <p>&nbsp;</p>
                    <AddCircleOutlineIcon className="hover-icon" onClick={() => handleSpikeIncrement(rowData)}/>
                </div>
            ),
        },
        {
            title: "atak+",
            field: "spike_point",
            render: (rowData) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    {rowData.spike_point || 0}
                    <p>&nbsp;</p>
                    <AddCircleOutlineIcon className="hover-icon" onClick={() => handleSpikePointIncrement(rowData)}/>
                </div>
            ),
        },
        {
            title: "atak_blok",
            field: "spike_block",
            cellStyle: {
                backgroundColor: '#f2f2f2',
            },
            render: (rowData) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    {rowData.spike_block || 0}
                    <p>&nbsp;</p>
                    <AddCircleOutlineIcon className="hover-icon" onClick={() => handleSpikeBlockIncrement(rowData)}/>
                </div>
            ),
        },
        {
            title: "atak_bł",
            field: "spike_error",
            render: (rowData) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    {rowData.spike_error || 0}
                    <p>&nbsp;</p>
                    <AddCircleOutlineIcon className="hover-icon" onClick={() => handleSpikeErrorIncrement(rowData)}/>
                </div>
            ),
        },
        {
            title: "blok",
            field: "block_amount",
            cellStyle: {
                backgroundColor: '#f2f2f2',
            },
            render: (rowData) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    {rowData.block_amount || 0}
                    <p>&nbsp;</p>
                    <AddCircleOutlineIcon className="hover-icon" onClick={() => handleBlockAmountIncrement(rowData)}/>
                </div>
            ),
        },
        {
            title: "obrona",
            field: "dig",
            render: (rowData) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    {rowData.dig || 0}
                    <p>&nbsp;</p>
                    <AddCircleOutlineIcon className="hover-icon" onClick={() => handleDigIncrement(rowData)}/>
                </div>
            ),
        },
    ]

    const handleSelectChange = (rowData, field, value) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {...row, [field]: value} : row
        );
        setData(updatedRows);
    };
    const handleServeIncrement = (rowData) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {...row, serve: Number(row.serve || 0) + 1} : row
        );
        setData(updatedRows);
    };

    const handleServeErrorIncrement = (rowData) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {
                ...row,
                serve_error: Number(row.serve_error || 0) + 1,
                serve: Number(row.serve || 0) + 1,
            } : row,
        );
        setData(updatedRows);
    };

    const handleServeAceIncrement = (rowData) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {
                ...row,
                serve_ace: Number(row.serve_ace || 0) + 1,
                serve: Number(row.serve || 0) + 1
            } : row
        );
        setData(updatedRows);
    };

    const handleReceptionIncrement = (rowData) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {...row, reception: Number(row.reception || 0) + 1} : row
        );
        setData(updatedRows);
    };

    const handlePositiveReceptionIncrement = (rowData) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {
                ...row,
                positive_reception: Number(row.positive_reception || 0) + 1,
                reception: Number(row.reception || 0) + 1
            } : row
        );
        setData(updatedRows);
    };

    const handleReceptionErrorIncrement = (rowData) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {
                ...row,
                reception_error: Number(row.reception_error || 0) + 1,
                reception: Number(row.reception || 0) + 1
            } : row
        );
        setData(updatedRows);
    };

    const handleSpikeIncrement = (rowData) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {...row, spike: Number(row.spike || 0) + 1} : row
        );
        setData(updatedRows);
    };

    const handleSpikePointIncrement = (rowData) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {
                ...row,
                spike_point: Number(row.spike_point || 0) + 1,
                spike: Number(row.spike || 0) + 1
            } : row
        );
        setData(updatedRows);
    };

    const handleSpikeBlockIncrement = (rowData) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {
                ...row,
                spike_block: Number(row.spike_block || 0) + 1,
                spike: Number(row.spike || 0) + 1
            } : row
        );
        setData(updatedRows);
    };

    const handleSpikeErrorIncrement = (rowData) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {
                ...row,
                spike_error: Number(row.spike_error || 0) + 1,
                spike: Number(row.spike || 0) + 1
            } : row
        );
        setData(updatedRows);
    };

    const handleBlockAmountIncrement = (rowData) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {...row, block_amount: Number(row.block_amount || 0) + 1} : row
        );
        setData(updatedRows);
    };

    const handleDigIncrement = (rowData) => {
        const updatedRows = data.map((row) =>
            row.id === rowData.id ? {...row, dig: Number(row.dig || 0) + 1} : row
        );
        setData(updatedRows);
    };

    const TitleComponent = () => {
        const [performances] = useFetchPerformances({match: id, team: team.id})
        const handleServerSynchronization = () => {
            if (performances) {
                const playerData = performances.map((performance) => {
                    const {
                        player,
                        set1_position,
                        set2_position,
                        set3_position,
                        set4_position,
                        set5_position,
                        serve,
                        serve_error,
                        serve_ace,
                        reception,
                        positive_reception,
                        reception_error,
                        spike,
                        spike_point,
                        spike_block,
                        spike_error,
                        block_amount,
                        dig
                    } = performance;

                    return {
                        id: player.id,
                        player: `${player.name} ${player.surname}`,
                        set1_position,
                        set2_position,
                        set3_position,
                        set4_position,
                        set5_position,
                        serve,
                        serve_error,
                        serve_ace,
                        reception,
                        positive_reception,
                        reception_error,
                        spike,
                        spike_point,
                        spike_block,
                        spike_error,
                        block_amount,
                        dig
                    };
                });

                setData(playerData);
                forceTableRerender();
            }
        };

        return (
            <div style={{fontSize: '25px', fontWeight: 'bold'}}>
                {team.name}
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleServerSynchronization}
                    style={{
                        backgroundColor: '#777',
                        marginLeft: '15px',
                    }}
                >
                    Synchronizuj z serwerem
                </Button>
            </div>
        )
    }

    const forceTableRerender = useCallback(() => {
    }, []);

    return (
        <ThemeProvider theme={tableTheme}>
            <div>
                {team && data && (
                    <MaterialTable
                        title={<TitleComponent/>}
                        forceRerender={forceTableRerender}
                        data={data}
                        columns={columns}
                        editable={{
                            onRowAdd: (newRow) => {
                                const updatedRows = [...data, {id: Math.floor(Math.random() * 100), ...newRow}];
                                setData(updatedRows);
                                return Promise.resolve();
                            },
                            onRowDelete: (selectedRow) => {
                                const index = selectedRow.tableData.id;
                                const updatedRows = [...data];
                                updatedRows.splice(index, 1);
                                setData(updatedRows);
                                return Promise.resolve();
                            },
                            onRowUpdate: (updatedRow, oldRow) => {
                                const index = oldRow.tableData.id;
                                const updatedRows = [...data];
                                updatedRows[index] = updatedRow;
                                setData(updatedRows);
                                return Promise.resolve();
                            },
                            onBulkUpdate: (selectedRows) => {
                                const rows = Object.values(selectedRows);
                                const updatedRows = [...data];
                                let index;
                                rows.forEach((emp) => {
                                    index = emp.oldData.tableData.id;
                                    updatedRows[index] = emp.newData;
                                });
                                setData(updatedRows);
                                return Promise.resolve();
                            },
                        }}
                        options={{
                            actionsColumnIndex: -1,
                            actionsCellStyle: {},
                            addRowPosition: "first",
                            paging: false,
                            search: false,
                            padding: 'dense',
                            color: 'black',
                            tableLayout: 'fixed',
                            headerStyle: {
                                fontSize: '14px',
                                fontWeight: 'bold',
                            },
                            rowStyle: {
                                fontSize: '18px',
                            },
                        }}
                        localization={{
                            header: {
                                actions: 'edytuj',
                            },
                        }}
                    />
                )
                }
            </div>
        </ThemeProvider>
    )
        ;
}

