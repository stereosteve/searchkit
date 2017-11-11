import * as React from 'react';
import { storiesOf, action, addDecorator } from '@storybook/react';
import { SearchkitManager,SearchkitProvider,
  SearchBox, RefinementListFilter, Pagination,
  MenuFilter, ItemHistogramList,
  HierarchicalMenuFilter, HitsStats, SortingSelector, NoHits,
  ResetFilters, RangeFilter, NumericRefinementListFilter,
  ViewSwitcherHits, ViewSwitcherToggle, DynamicRangeFilter,
  InputFilter, GroupedSelectedFilters, QueryAccessor,
  Layout, TopBar, LayoutBody, LayoutResults,
  ActionBar, ActionBarRow, SideBar } from '../src'
import '../theming';


const host = "http://demo.searchkit.co/api/movies"
const searchkit = new SearchkitManager(host)

storiesOf('Filters', module)
  .add('ViewSwitcherToggle', () => (
    <SearchkitProvider searchkit={searchkit}>
      <LayoutResults>
        <ActionBar>
          <ActionBarRow>
            <ViewSwitcherToggle/>
          </ActionBarRow>
        </ActionBar>
        <ViewSwitcherHits
                hitsPerPage={12} highlightFields={["title","plot"]}
                sourceFilter={["plot", "title", "poster", "imdbId", "imdbRating", "year"]}
                hitComponents={[
                  {key:"grid", title:"Grid", defaultOption:true},
                  {key:"list", title:"List"}
                ]}
                scrollTo="body"
            />
      </LayoutResults>
    </SearchkitProvider>
  ))
  .add('RefinementListFilter', () => (
    <SearchkitProvider searchkit={searchkit}>
      <RefinementListFilter id="actors" title="Actors" field="actors.raw" size={10}/>
    </SearchkitProvider>
  ))
  .add('ItemHistogramList', () => (
    <SearchkitProvider searchkit={searchkit}>
      <MenuFilter field={"type.raw"} title="ItemHistogramList" id="histogram-list" listComponent={ItemHistogramList} />
    </SearchkitProvider>
  ))
