import { createStyles, makeStyles, Typography, Grid, Paper, Card, IconButton } from '@material-ui/core'
import type { PoolSettings } from '../hooks/useFillCallback'
import ActionButton from '../../../extension/options-page/DashboardComponents/ActionButton'
import { useI18N } from '../../../utils/i18n-next-ui'
import { languageSettings } from '../../../settings/settings'
import LaunchIcon from '@material-ui/icons/Launch'
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            fontSize: 18,
        },
        line: {
            display: 'flex',
            padding: theme.spacing(1),
        },
        data: {
            padding: theme.spacing(1),
            textAlign: 'right',
            color: theme.palette.text.primary,
        },
        label: {
            padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
        button: {
            padding: theme.spacing(2),
        },
    }),
)
export interface ConfirmDialogProps {
    poolSettings?: PoolSettings
    onDone: () => void
    onBack: () => void
}

export function ConfirmDialog(props: ConfirmDialogProps) {
    const { poolSettings, onDone, onBack } = props
    const classes = useStyles()
    const { t } = useI18N()
    const dateTimeFormat = Intl.DateTimeFormat(languageSettings.value, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    })

    return (
        <Card>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography variant="h3" className={classes.title} component="h3">
                        {poolSettings?.title}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.label}>{t('plugin_ito_sell_token')}</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.data} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Typography variant="body1" component="span" style={{ marginLeft: 2 }}>
                            {poolSettings?.token?.symbol}
                        </Typography>
                        <IconButton style={{ padding: 0 }}>
                            <LaunchIcon fontSize="small" />
                        </IconButton>
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.label}>{t('plugin_ito_sell_total_amount')}</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.data}>{poolSettings?.total}</Paper>
                </Grid>

                {poolSettings?.exchangeTokens
                    .filter((item, index) => item)
                    .map((item, index) => {
                        return (
                            <>
                                <Grid item xs={6}>
                                    <Paper className={classes.label}>
                                        {item?.symbol}/{poolSettings?.token?.symbol}
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.data}>{poolSettings?.exchangeAmounts[index]}</Paper>
                                </Grid>
                            </>
                        )
                    })}

                <Grid item xs={6}>
                    <Paper className={classes.label}>{t('plugin_ito_allocation_per_wallet')}</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.data}>{poolSettings?.limit}</Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.label}>{t('plugin_ito_begin_times')}</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.data}>{dateTimeFormat.format(poolSettings?.startTime)}</Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.label}>{t('plugin_ito_end_times')}</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.data}>{dateTimeFormat.format(poolSettings?.endTime)}</Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.title} component="p">
                        {t('plugin_ito_send_tip')}
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.button}>
                    <ActionButton fullWidth variant="contained" onClick={onBack}>
                        {t('plugin_ito_back')}
                    </ActionButton>
                </Grid>
                <Grid item xs={6} className={classes.button}>
                    <ActionButton fullWidth variant="contained" onClick={onDone}>
                        {t('plugin_ito_send_text', {
                            tital: poolSettings?.token,
                            symbol: poolSettings?.token?.symbol,
                        })}
                    </ActionButton>
                </Grid>
            </Grid>
        </Card>
    )
}
