/**
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license Proprietary
 */

import { LoadStatus } from "@library/@types/api/core";
import { AnalyticsData } from "@library/analytics/AnalyticsData";
import { IResult } from "@library/result/Result";
import ResultList from "@library/result/ResultList";
import { ResultMeta } from "@library/result/ResultMeta";
import { SearchPageResultsLoader } from "@library/search/SearchPageResultsLoader";
import { SearchPagination } from "@library/search/SearchPagination";
import { ISearchResult } from "@library/search/searchTypes";
import { SearchFormContextProvider, useSearchForm } from "@vanilla/library/src/scripts/search/SearchFormContext";
import { useLastValue } from "@vanilla/react-utils";
import { hashString } from "@vanilla/utils";
import React, { useEffect, useLayoutEffect } from "react";
import { CoreErrorMessages } from "@library/errorPages/CoreErrorMessages";

interface IProps {}

export function SearchPageResults(props: IProps) {
    const { search, updateForm, results, form } = useSearchForm<{}>();

    const page = form.page ?? 1;
    const lastPage = useLastValue(page);
    useEffect(() => {
        if (results.data && page !== lastPage) {
            search();
        }
    }, [lastPage, page, search, results]);

    const status = results.status;
    const lastStatus = useLastValue(status);
    useLayoutEffect(() => {
        if (lastStatus === LoadStatus.SUCCESS && status === LoadStatus.LOADING) {
            window.scrollTo({ top: 0 });
        }
    }, [status, lastStatus]);

    switch (results.status) {
        case LoadStatus.PENDING:
        case LoadStatus.LOADING:
            return <SearchPageResultsLoader count={10} />;
        case LoadStatus.ERROR:
            return <CoreErrorMessages error={results.error} />;
        case LoadStatus.SUCCESS:
            const { next, prev } = results.data!.pagination;
            let paginationNextClick: React.MouseEventHandler | undefined;
            let paginationPreviousClick: React.MouseEventHandler | undefined;

            if (next) {
                paginationNextClick = e => {
                    updateForm({ page: next });
                };
            }
            if (prev) {
                paginationPreviousClick = e => {
                    updateForm({ page: prev });
                };
            }
            return (
                <>
                    <AnalyticsData uniqueKey={hashString(form.query + JSON.stringify(results.data!.pagination))} />
                    <ResultList results={results.data!.results.map(mapResult)} />
                    <SearchPagination onNextClick={paginationNextClick} onPreviousClick={paginationPreviousClick} />
                </>
            );
    }
}

/**
 * Map a search API response into what the <SearchResults /> component is expecting.
 *
 * @param searchResult The API search result to map.
 */
function mapResult(searchResult: ISearchResult): IResult {
    const crumbs = searchResult.breadcrumbs || [];

    const icon = SearchFormContextProvider.getSubType(searchResult.type)?.icon;

    return {
        name: searchResult.name,
        excerpt: searchResult.body,
        icon,
        meta: (
            <>
                <ResultMeta
                    status={searchResult.status}
                    type={searchResult.recordType}
                    updateUser={searchResult.insertUser!}
                    dateUpdated={searchResult.dateInserted}
                    crumbs={crumbs}
                />
            </>
        ),
        image: searchResult.image?.url,
        url: searchResult.url,
        location: crumbs,
    };
}
