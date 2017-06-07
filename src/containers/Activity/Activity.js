import React, {Component} from 'react';
import { connect } from 'react-redux';
import { ResponsiveAppBar } from 'material-ui-responsive-drawer';
import { Helmet } from 'react-helmet';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { ResponsiveDrawer, BodyContainer } from 'material-ui-responsive-drawer';
import { DrawerHeader } from '../../containers/Drawer';
import { DrawerContent } from '../../containers/Drawer';
import { isConnected } from '../../store/connection/selector';
import LinearProgress from 'material-ui/LinearProgress';

export class Activity extends Component {

  getIconElementLeft = () => {

    const {onBackClick} = this.props;

    if(onBackClick){
      return <IconButton>
        <FontIcon className="material-icons" >chevron_left</FontIcon>
      </IconButton>
    }else {
      return undefined;
    }
  }


  render(){

    const {
      muiTheme,
      title,
      children,
      onBackClick,
      history,
      intl,
      isConnected,
      isLoading,
      dispatch,
      containerStyle,
      ...rest
    } = this.props;

    const bodyContainerStyle={
      backgroundColor: muiTheme.palette.canvasColor,
      top:64,
      bottom: 0,
      overflow: 'auto',
      ...containerStyle
    };

    return (
      <div style={{backgroundColor: muiTheme.palette.canvasColor, height: '100%'}}>
        <Helmet>
          <meta name="theme-color" content={muiTheme.palette.primary1Color}/>
          <meta name="apple-mobile-web-app-status-bar-style" content={muiTheme.palette.primary1Color}/>
          <meta name="msapplication-navbutton-color" content={muiTheme.palette.primary1Color}/>
          <title>{title}</title>
        </Helmet>
        <ResponsiveDrawer>
          <DrawerHeader/>
          <DrawerContent/>
        </ResponsiveDrawer>

        <ResponsiveAppBar
          title={title}
          showMenuIconButton={onBackClick!==undefined?true:undefined}
          onLeftIconButtonTouchTap={onBackClick}
          iconElementLeft={this.getIconElementLeft()}
          {...rest}
        />
        {!isConnected &&
          <LinearProgress mode="determinate" value={100} color="red" style={{zIndex:9999, position: 'fixed', top: 0}} />
        }

        {isLoading &&
          <LinearProgress mode="indeterminate" color="green" style={{zIndex:9998, position: 'fixed', top: 0}}/>
        }

        <BodyContainer id="bodyContainer" ref="bodyContainer" withRef style={bodyContainerStyle} >
          {children}
        </BodyContainer>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  const { connection } = state;

  return {
    isConnected: isConnected(connection),
  };
};

export default connect(
  mapStateToProps,
)(muiThemeable()(Activity));
