import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { Table as MuiTable, TableBody, TableContainer, TableRow, TablePagination } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Table({ columns, rows }) {
  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderColumns = columns.map(({ name, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
        <SoftBox
            key={name}
            component="th"
            width={width || "auto"}
            pt={1.5}
            pb={1.25}
            pl={align === "left" ? pl : 3}
            pr={align === "right" ? pr : 3}
            textAlign={align}
            fontSize={size.xxs}
            fontWeight={fontWeightBold}
            color="secondary"
            opacity={0.7}
            borderBottom={`${borderWidth[1]} solid ${light.main}`}
        >
          {name.toUpperCase()}
        </SoftBox>
    );
  });

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const renderRows = paginatedRows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
            <SoftBox
                key={uuidv4()}
                component="td"
                p={1}
                borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
            >
              <SoftBox display="flex" alignItems="center" py={0.5} px={1}>
                <SoftBox mr={2}>
                  <SoftAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
                </SoftBox>
                <SoftTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                  {row[name][1]}
                </SoftTypography>
              </SoftBox>
            </SoftBox>
        );
      } else {
        template = (
            <SoftBox
                key={uuidv4()}
                component="td"
                p={1}
                textAlign={align}
                borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
            >
              <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  color="secondary"
                  sx={{ display: "inline-block", width: "max-content" }}
              >
                {row[name]}
              </SoftTypography>
            </SoftBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
      () => (
          <>
            <TableContainer>
              <MuiTable>
                <SoftBox component="thead">
                  <TableRow>{renderColumns}</TableRow>
                </SoftBox>
                <TableBody>{renderRows}</TableBody>
              </MuiTable>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[25, 50, 100, 200]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                  "& .MuiTablePagination-toolbar": {
                    maxWidth: "300px", // Adjust the minimum width
                  },
                  "& .MuiTablePagination-actions": {
                    display: "flex",
                    justifyContent: "flex-end", // Adjust action alignment
                  },
                }}

            />

          </>
      ),
      [columns, rows, page, rowsPerPage]
  );
}

Table.defaultProps = {
  columns: [],
  rows: [{}],
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
