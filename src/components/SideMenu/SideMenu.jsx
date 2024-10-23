/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { Fragment, useEffect } from 'react';
import { useIntl } from 'react-intl';
import {
  Box,
  ButtonBase,
  Collapse,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  useTheme
} from '@material-ui/core';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import { Images } from 'assets';
import { ProfilePreview } from './ProfilePreview';
import { MiniMenuSwitch } from './MiniMenuSwitch';
import { useSideMenu } from '.';
import { useStyles } from './SideMenuStyles';
import { useLists } from './helpers';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  const route = useRouteMatch();
  const { formatMessage } = useIntl();
  const theme = useTheme();
  const { visible, setVisible, mini, expanded, setExpanded } = useSideMenu();
  const classes = useStyles({ expanded });

  const lists = useLists();

  const subitemsVisibilityStates = {};

  useEffect(() => setVisible(false), [route]);

  const getSubitemsList = (key, subitems, visible) => (
    <Collapse in={visible} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {subitems.map((item, index) => (
          <ListItem
            key={`${key}-subitems-${index}`}
            button
            component={item.to ? Link : null}
            to={item.to}
            className={classes.listItem}
          >
            <ListItemIcon classes={{ root: `${classes.listItemIcon}` }}>
              <span
                className={`${classes.point} ${
                  item.to === route.path && 'active'
                }`}
              />
            </ListItemIcon>
            <ListItemText
              className={classes.listItemText}
              primaryTypographyProps={{
                variant: 'body2',
                color: 'textSecondary',
                className: item.to === route.path && classes.boldText
              }}
            >
              {formatMessage(item.message)}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );

  const getList = (list, index) => (
    <List
      key={`sidemenu-list-${index}`}
      subheader={
        list.title ? (
          <ListSubheader
            key={`sidemenu-list-subheader-${index}`}
            disableSticky
            classes={{ root: classes.listSubHeader }}
            component="div"
          >
            {formatMessage(list.title)}
          </ListSubheader>
        ) : null
      }
    >
      {list.items.map((item, index) => {
        const [subitemsVisible, setSubitemsVisible] = subitemsVisibilityStates[
          item.name
        ] || [false, () => null];

        return (
          <Fragment key={`${item.name || item.message}-item-${index}`}>
            <ListItem
              classes={{
                root: `${classes.listItem} ${
                  route.path === item.path && 'active'
                }`
              }}
              button
              component={!item.subitems && item.path ? Link : null}
              to={item.path}
              onClick={() => {
                setSubitemsVisible((visible) => !visible);
                item.action && item.action();
              }}
            >
              <ListItemIcon classes={{ root: `${classes.listItemIcon}` }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primaryTypographyProps={{
                  variant: 'body2',
                  color: 'textSecondary'
                }}
              >
                {formatMessage(item.message)}
              </ListItemText>
              {!!item.subitems && (
                <ExpandIcon
                  className={`${classes.expandIcon} ${
                    subitemsVisible ? 'inverted' : ''
                  }`}
                />
              )}
            </ListItem>
            {!!item.subitems &&
              getSubitemsList(
                item.name || item.message,
                item.subitems,
                subitemsVisible
              )}
          </Fragment>
        );
      })}
    </List>
  );

  const drawer = (
    <Box pr={0.5}>
      <ButtonBase
        disableRipple
        component={Link}
        to="/"
        className={classes.logoContainer}
      >
        <div className={classes.companyIconLogo} />
        <div className={classes.companyTextLogo} />
      </ButtonBase>
      <MiniMenuSwitch />
      <ProfilePreview />
      {lists.map(getList)}
    </Box>
  );

  return (
    <>
      <Hidden mdUp implementation="css">
        <Drawer
          transitionDuration={theme.transitions.duration.standard}
          variant="temporary"
          anchor="left"
          open={visible}
          onClose={() => setVisible(false)}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
          onMouseOver={mini ? () => setExpanded(true) : null}
          onMouseLeave={mini ? () => setExpanded(false) : null}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </>
  );
};

export { SideMenu };
