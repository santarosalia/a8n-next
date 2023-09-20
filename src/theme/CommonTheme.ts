import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";
export const listItem = createTheme({
    components : {
        MuiListItemButton : {
            styleOverrides : {
                root : {
                    backgroundColor : purple[100],
                    ":hover" : {
                        backgroundColor : purple[200]
                    },
                    '&.Mui-selected' : {
                        backgroundColor : purple[400],
                        ':hover' : {
                            backgroundColor : purple[200]
                        }
                    }
                }
                
            }
        }
    }
})