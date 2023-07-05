// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';

// ** Components
import CheckLists from './CheckLists';
import PastDueClient from './PastDueClient';

const ListTabs = (props) => {
  // ** State
  const { setSelectedWorkingCheckList, setTaskTab, selectDate, today } = props;
  const [active, setActive] = useState('today');

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
      setSelectedWorkingCheckList(null);
      setTaskTab(tab);
    }
  };

  useEffect(() => {
    let tmpSelDate = new Date(selectDate).getTime();
    let tmpToday = new Date(today).getTime();
    tmpSelDate >= tmpToday ? setActive('today') : setActive('completed');
  }, [selectDate]);

  let tmpSelDate = new Date(selectDate).getTime();
  let tmpToday = new Date(today).getTime();

  const buildProps = {
    ...props,
    activeTab: active
  };

  return (
    <Fragment>
      <Nav className="justify-content-center" tabs>
        {tmpToday === tmpSelDate ? (
          <>
            <NavItem>
              <NavLink
                active={active === 'today'}
                onClick={() => {
                  toggle('today');
                }}
              >
                Today
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === 'completed'}
                onClick={() => {
                  toggle('completed');
                }}
              >
                Completed
              </NavLink>
            </NavItem>
          </>
        ) : (
          <>
            {tmpToday > tmpSelDate && (
              <NavItem>
                <NavLink
                  active={active === 'completed'}
                  onClick={() => {
                    toggle('completed');
                  }}
                >
                  Completed
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <NavLink
                active={active === 'today'}
                onClick={() => {
                  toggle('today');
                }}
              >
                {tmpToday < tmpSelDate ? 'To Do' : 'Past Due'}
              </NavLink>
            </NavItem>
          </>
        )}
        {/* <NavItem>
          <NavLink
            active={active === 'past-due'}
            onClick={() => {
              toggle('past-due');
            }}
          >
            Past Due
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        {tmpToday === tmpSelDate ? (
          <>
            <TabPane tabId="today">
              <CheckLists {...buildProps} />
            </TabPane>
            <TabPane tabId="completed">
              <CheckLists {...buildProps} />
            </TabPane>
          </>
        ) : (
          <>
            <TabPane tabId="completed">
              <CheckLists {...buildProps} />
            </TabPane>
            <TabPane tabId="today">
              <CheckLists {...buildProps} />
            </TabPane>
          </>
        )}
        {/* <TabPane tabId="past-due">
          <PastDueClient {...buildProps} />
        </TabPane> */}
      </TabContent>
    </Fragment>
  );
};
export default ListTabs;
