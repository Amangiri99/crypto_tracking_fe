import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { StyledTableCellHeader } from "./styles";

export interface Crypto {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  short_name: string | null;
  price: string | null;
  one_hour_change: string | null;
  one_day_change: string | null;
  one_week_change: string | null;
  market_cap: string | null;
  volume_in_dollars: string | null;
  volume_in_crypto: string | null;
  circulating_supply: string | null;
}

export interface ICryptoTable {
  cryptoList: Crypto[];
}

const getColor = (text: string | null) => {
  if (!text) {
    return "black";
  }

  if (text.includes("-")) {
    return "red";
  }

  return "green";
};

export const CryptoTable = ({ cryptoList }: ICryptoTable) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <StyledTableCellHeader>#</StyledTableCellHeader>
            <StyledTableCellHeader>Name</StyledTableCellHeader>
            <StyledTableCellHeader align="right">Price</StyledTableCellHeader>
            <StyledTableCellHeader align="right">1h %</StyledTableCellHeader>
            <StyledTableCellHeader align="right">24h %</StyledTableCellHeader>
            <StyledTableCellHeader align="right">7d %</StyledTableCellHeader>
            <StyledTableCellHeader align="right">
              Market Cap
            </StyledTableCellHeader>
            <StyledTableCellHeader align="right">
              Volume(24h)
            </StyledTableCellHeader>
            <StyledTableCellHeader align="right">
              Circulating Supply
            </StyledTableCellHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {cryptoList.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {row.name}{" "}
                <Typography component="span" sx={{ color: "grey" }}>
                  {row.short_name || ""}
                </Typography>
              </TableCell>
              <TableCell align="right">
                {row.price || "Error fetching price"}
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: getColor(row.one_hour_change) }}
              >
                {row.one_hour_change || "Error fetching one hour change"}
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: getColor(row.one_day_change) }}
              >
                {row.one_day_change || "Error fetching one day change"}
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: getColor(row.one_week_change) }}
              >
                {row.one_week_change || "Error fetching one week change"}
              </TableCell>
              <TableCell align="right">
                {row.market_cap || "Error fetching market cap"}
              </TableCell>
              <TableCell align="right">
                {row.volume_in_dollars || "Error fetching volume in dollars"}
                <Typography sx={{ color: "grey" }}>
                  {row.volume_in_crypto || "Error fetching volume in crypto"}
                </Typography>
              </TableCell>
              <TableCell align="right">
                {row.circulating_supply || "Error fetching circulating supply"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
