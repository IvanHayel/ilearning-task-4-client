import SecurityIcon                         from "@mui/icons-material/Security";
import {Box, Typography}                    from "@mui/material";
import {DataGrid, GridToolbar}              from "@mui/x-data-grid";
import {observer}                           from "mobx-react-lite";
import React, {useEffect, useState}         from "react";
import {useStore}                                        from "../../Hooks";
import {blockUser, deleteUser, getAllUsers, unblockUser} from "../../Services";
import "./Styles/AdminBoard.scss";
import {BlockDialog, DeleteDialog}          from "../../Components";
import {
  UnblockDialog
}                                           from "../../Components/Dialogs/UnblockDialog";

export const AdminBoard = observer(() => {
  const [pageSize, setPageSize] = useState(5);
  const [selectedData, setSelectedData] = useState([]);
  const userStore = useStore("userStore");
  const rows = userStore.getUsers();
  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      align: "right",
      width: 50,
    },
    {field: "username", headerName: "Username", flex: 2},
    {field: "email", headerName: "Email", flex: 3},
    {field: "createdAt", headerName: "Created", flex: 3},
    {field: "updatedAt", headerName: "Updated", flex: 3},
    {field: "lastLogin", headerName: "Last login", flex: 3},
    {field: "active", headerName: "Online", flex: 1},
    {field: "blocked", headerName: "Blocked", flex: 1},
  ];

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
    };
    fetchData().catch(console.error);
  }, []);
  return (
      <Box className="board">
        <Typography className="board-title" variant="h4">
          ADMIN BOARD <SecurityIcon size="large" />
        </Typography>
        {
            selectedData.length > 0 && (
                <Box className="action-buttons">
                  <Typography variant="h5">
                    Unblock user(s):
                  </Typography>
                  <UnblockDialog
                      itemToUnblock="user(s)"
                      buttonSize="large"
                      onConfirmUnblock={async () => {
                        selectedData.filter((row) => row.blocked)
                        .forEach(async (row) => {
                          await unblockUser(row.id, false);
                        });
                      }}
                  />
                  <Typography variant="h5">
                    Block user(s):
                  </Typography>
                  <BlockDialog
                      itemToBlock="user(s)"
                      buttonSize="large"
                      onConfirmBlock={async () => {
                        selectedData.filter((row) => !row.blocked)
                        .forEach(async (row) => {
                          await blockUser(row.id);
                        });
                      }}
                  />
                  <Typography variant="h5">
                    Delete user(s):
                  </Typography>
                  <DeleteDialog
                      itemToDelete="user(s)"
                      buttonSize="large"
                      onConfirmDelete={() => {
                        selectedData.forEach(async (row) => {
                          await deleteUser(row.id);
                        });
                      }}
                  />
                </Box>
            )
        }
        <DataGrid
            className={"board-grid"}
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            autoHeight
            checkboxSelection
            disableSelectionOnClick
            onPageSizeChange={(size) => setPageSize(size)}
            rowsPerPageOptions={[1, 5, 10, 15, 30, 50, 100]}
            components={{
              Toolbar: GridToolbar,
            }}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRowData = rows.filter((row) =>
                  selectedIDs.has(row.id)
              );
              setSelectedData(selectedRowData);
            }}
        />
      </Box>
  );
});
