import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import { useFormik } from 'formik';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

import * as yup from 'yup';
import DateFnsUtils from '@date-io/date-fns';

import {
    KeyboardDatePicker
} from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const validationSchema = yup.object({
    numeroControl: yup
        .string()
        .trim()
        .matches(/^[A-Z0-9]*$/, 'Sólo se aceptan números y letras.')
        .max(15, 'El campo solo puede ser máximo 15 números o letras.')
        .required(),
    curp: yup
        .string()
        .trim()
        .matches(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/, 'El formato del CURP es inválido.')
        .max(18)
        .required(),
    nombre: yup
        .string()
        .trim()
        .matches(/^[A-ZÑ]+(?: [A-ZÑ]+)*$/, 'Solo letras sin acento y mayusculas.')
        .required(),
    primerApellido: yup
        .string()
        .trim()
        .matches(/^[A-ZÑ]+(?: [A-ZÑ]+)*$/, 'Solo letras sin acento y mayusculas.')
        .required(),
    email: yup
        .string()
        .trim()
        .email('Por favor, escriba una dirección de correo válida.')
        .required()
});


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));
export const AlumnosScreen = () => {
    //this.alert = React.createRef();
    const src = useRef(null);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const formik = useFormik({
        initialValues: {
            numeroControl: '',
            curp: '',
            nombre: "",
            primerApellido: "",
            email: '',
            fechaNacimiento: new Date()
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setOpen(true);
            src.current.innerText = JSON.stringify(values, null, 2);
            console.log(src);


            //alert(JSON.stringify(values, null, 2));
        },
    });
    //const dispatch = useDispatch();
    //const { loading } = useSelector(state => state.alumnos);

    // useEffect(() => {

    //     dispatch(startLoadingAlumnos());



    // }, [dispatch])


    const handleClickNew = () => {
        //dispatch(uiOpenModal())
    }


    return (


        <>

            <CssBaseline />

            <main className={classes.layout}>
                <Collapse in={open}>
                    <Alert
                        ref={src}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Close me!
        </Alert>
                </Collapse>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Agregar nuevo alumno
          </Typography>

                    <React.Fragment>
                        {/* <form onSubmit={handleSubmit(onSubmit)} className={classes.container}> */}
                        <form onSubmit={formik.handleSubmit}>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="numeroControl"
                                        name="numeroControl"
                                        label="No. Control"
                                        value={formik.values.numeroControl}
                                        onChange={formik.handleChange}
                                        error={formik.touched.numeroControl && Boolean(formik.errors.numeroControl)}
                                        helperText={formik.touched.numeroControl && formik.errors.numeroControl}
                                        fullWidth
                                        autoComplete="given-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="curp"
                                        name="curp"
                                        label="CURP"
                                        value={formik.values.curp}
                                        onChange={formik.handleChange}
                                        error={formik.touched.curp && Boolean(formik.errors.curp)}
                                        helperText={formik.touched.curp && formik.errors.curp}
                                        fullWidth
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="nombre"
                                        name="nombre"
                                        label="Nombre"
                                        value={formik.values.nombre}
                                        onChange={formik.handleChange}
                                        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                        helperText={formik.touched.nombre && formik.errors.nombre}
                                        fullWidth
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="primerApellido"
                                        name="primerApellido"
                                        label="Primer Apellido"
                                        fullWidth
                                        value={formik.values.primerApellido}
                                        onChange={formik.handleChange}
                                        error={formik.touched.primerApellido && Boolean(formik.errors.primerApellido)}
                                        helperText={formik.touched.primerApellido && formik.errors.primerApellido}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        name="email"
                                        label="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        helperText={formik.touched.email ? formik.errors.email : ""}
                                        error={Boolean(formik.errors.email)}
                                    />
                                </Grid>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item xs={12}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Date picker dialog"
                                            format="MM/dd/yyyy"
                                            value={formik.values.fechaNacimiento}
                                            onChange={val => {
                                                formik.setFieldValue("fechaNacimiento", val);
                                            }}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item xs={12}>

                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="m/d/Y"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date picker inline"
                                            value={formik.values.fechaNacimiento}
                                            onChange={val => {
                                                formik.setFieldValue("fechaNacimiento", val);
                                            }}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>



                            </Grid>
                            {/* <Button onClick={formik.handleSubmit}

                                type="submit" fullWidth variant="contained" color="primary">
                                Guardar
                            </Button> */}
                            {/* <Button
                                onClick={formik.handleSubmit}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<Icon>send</Icon>}
                            >
                                Send
                            </Button> */}
                            <Button
                            fullWidth
                            onClick={formik.handleSubmit}

                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                            >
                                Save
      </Button>
                        </form>
                    </React.Fragment>
                </Paper>
            </main>
        </>
    )
}