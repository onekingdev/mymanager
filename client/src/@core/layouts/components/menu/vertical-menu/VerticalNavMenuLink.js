// ** React Imports
import { useContext, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// ** Third Party Components
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

// ** Reactstrap Imports
import { Badge } from 'reactstrap';
import { AbilityContext } from '../../../../../utility/context/Can';
import { Lock } from 'react-feather';
import { TemplateContext } from '../../../../../utility/context/Template';

const VerticalNavMenuLink = ({ item, activeItem, setActiveItem, currentActiveItem }) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = item.externalLink ? 'a' : NavLink;

  const ability = useContext(AbilityContext);
  const template = useContext(TemplateContext)

  // ** Hooks
  const { t } = useTranslation();
  const location = useLocation();
  useEffect(() => {
    if (currentActiveItem !== null) {
      setActiveItem(currentActiveItem);
    }
  }, [location]);
  return (
    <li
      className={classnames({
        'nav-item': !item.children,
        disabled: !ability.can('read', item.resource),
        active: item.navLink === activeItem
      })}
    >
      <LinkTag
        className="d-flex align-items-center"
        target={item.newTab ? '_blank' : undefined}
        /*eslint-disable */
        {...(item.externalLink === true
          ? {
              href: item.navLink || '/'
            }
          : {
              to: item.navLink || '/',
              isActive: (match) => {
                if (!match) {
                  return false;
                }

                if (match.url && match.url !== '' && match.url === item.navLink) {
                  currentActiveItem = item.navLink;
                }
              }
            })}
        onClick={(e) => {
          if (item.navLink.length === 0 || item.navLink === '#' || item.disabled === true) {
            e.preventDefault();
          }
        }}
      >
        <div className="w-100 d-flex justify-content-between">
          <div>
            {item.icon} 

            <span className="menu-item text-truncate">{template.elements.find(x=>x.resource===item.resource)?.title || t(item.title) }</span> 
          </div>

          {item.badge && item.badgeText ? (
            <Badge className="ms-auto me-1" color={item.badge} pill>
              {item.badgeText}
            </Badge>
          ) : null}

          {ability.can('read', item.resource) ? <></> : <Lock style={{ width:"9px" }} />}
        </div>
      </LinkTag>
    </li>
  );
};

export default VerticalNavMenuLink;
