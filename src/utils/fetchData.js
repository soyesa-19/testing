import axios from 'axios';

export const fetchData = async (pageSize, q) => {

    const requstBody = {
        "operationName": "SearchRequestQuery",
        "variables": {
            "filterCounts": true,
            "request": {
                "paging": {
                    "page": 1,
                    "pageSize": parseInt(pageSize)
                },
                "filterVersion": "1",
                "coreFilters": {
                    "adults": 1,
                    "maxBathrooms": null,
                    "maxBedrooms": null,
                    "maxNightlyPrice": null,
                    "maxTotalPrice": null,
                    "minBathrooms": 0,
                    "minBedrooms": 0,
                    "minNightlyPrice": 0,
                    "minTotalPrice": null,
                    "pets": 0
                },
                "filters": [],
                "q": q
            },
            "optimizedBreadcrumb": false,
            "vrbo_web_global_messaging_banner": true
        },
        "extensions": {
            "isPageLoadSearch": true
        },
        "query" : "query SearchRequestQuery($request: SearchResultRequest!, $filterCounts: Boolean!, $optimizedBreadcrumb: Boolean!, $vrbo_web_global_messaging_banner: Boolean!) {  results: search(request: $request) {    ...querySelectionSet    ...DestinationBreadcrumbsSearchResult    ...DestinationMessageSearchResult    ...FilterCountsSearchRequestResult    ...HitCollectionSearchResult    ...ADLSearchResult    ...MapSearchResult    ...ExpandedGroupsSearchResult    ...PagerSearchResult    ...SearchTermCarouselSearchResult    ...InternalToolsSearchResult    ...SEOMetaDataParamsSearchResult    ...GlobalInlineMessageSearchResult    ...GlobalBannerContainerSearchResult @include(if: $vrbo_web_global_messaging_banner)    __typename  }}fragment querySelectionSet on SearchResult {  id  typeaheadSuggestion {    uuid    term    name    __typename  }  geography {    lbsId    gaiaId    location {      latitude      longitude      __typename    }    isGeocoded    shouldShowMapCentralPin    __typename  }  propertyRedirectUrl  __typename}fragment DestinationBreadcrumbsSearchResult on SearchResult {  destination(optimizedBreadcrumb: $optimizedBreadcrumb) {    breadcrumbs {      name      url      __typename    }    __typename  }  __typename}fragment HitCollectionSearchResult on SearchResult {  page  pageSize  pageCount  queryUUID  percentBooked {    currentPercentBooked    __typename  }  listings {    ...HitListing    __typename  }  resultCount  pinnedListing {    headline    listing {      ...HitListing      __typename    }    __typename  }  __typename}fragment HitListing on Listing {  virtualTourBadge {    name    id    helpText    __typename  }  amenitiesBadges {    name    id    helpText    __typename  }  images {    altText    c6_uri    c9_uri    mab {      banditId      payloadId      campaignId      cached      arm {        level        imageUrl        categoryName        __typename      }      __typename    }    __typename  }  ...HitInfoListing  __typename}fragment HitInfoListing on Listing {  listingId  ...HitInfoDesktopListing  ...HitInfoMobileListing  ...PriceListing  __typename}fragment HitInfoDesktopListing on Listing {  detailPageUrl unitApiUrl  instantBookable  minStayRange {    minStayHigh    minStayLow    __typename  }  listingId  listingNumber  rankedBadges(rankingStrategy: SERP) {    id    helpText    name    __typename  }  propertyId  propertyMetadata {    headline    __typename  }  superlativesBadges: rankedBadges(rankingStrategy: SERP_SUPERLATIVES) {    id    helpText    name    __typename  }  unitMetadata {    unitName    __typename  }  webRatingBadges: rankedBadges(rankingStrategy: SRP_WEB_RATING) {    id    helpText    name    __typename  }  ...DetailsListing  ...GeoDistanceListing  ...RateSummary ...PriceListing  ...RatingListing  __typename}fragment DetailsListing on Listing {  bathrooms {    full    half    toiletOnly    __typename  }  bedrooms  propertyType  sleeps  petsAllowed  spaces {    spacesSummary {      area {        areaValue        __typename      }      bedCountDisplay      __typename    }    __typename  }  __typename}fragment GeoDistanceListing on Listing {  geoDistance {    text    relationType    __typename  }  __typename}  fragment RateSummary on Listing { rateSummary { beginDate  endDate rentNights } } fragment PriceListing on Listing {  priceSummary: priceSummary {  priceAccurate    ...PriceSummaryTravelerPriceSummary    __typename  }  priceSummarySecondary: priceSummary(summary: \"displayPriceSecondary\") {    ...PriceSummaryTravelerPriceSummary    __typename  }  priceLabel: priceSummary(summary: \"priceLabel\") {    priceTypeId    pricePeriodDescription    __typename  }  prices {    ...VrboTravelerPriceSummary    __typename  }  __typename}fragment PriceSummaryTravelerPriceSummary on TravelerPriceSummary {  priceTypeId  edapEventJson  formattedAmount  roundedFormattedAmount  pricePeriodDescription  __typename}fragment VrboTravelerPriceSummary on PriceSummary {  perNight {    amount    formattedAmount    roundedFormattedAmount    pricePeriodDescription    __typename  }  total {    amount    formattedAmount    roundedFormattedAmount    pricePeriodDescription    __typename  }  label  mainPrice  __typename}fragment RatingListing on Listing {  averageRating  reviewCount  __typename}fragment HitInfoMobileListing on Listing {  detailPageUrl  instantBookable  minStayRange {    minStayHigh    minStayLow    __typename  }  listingId  listingNumber  rankedBadges(rankingStrategy: SERP) {    id    helpText    name    __typename  }  propertyId  propertyMetadata {    headline    __typename  }  superlativesBadges: rankedBadges(rankingStrategy: SERP_SUPERLATIVES) {    id    helpText    name    __typename  }  unitMetadata {    unitName    __typename  }  webRatingBadges: rankedBadges(rankingStrategy: SRP_WEB_RATING) {    id    helpText    name    __typename  }  ...DetailsListing  ...GeoDistanceListing ...RateSummary ...PriceListing  ...RatingListing  __typename}fragment ExpandedGroupsSearchResult on SearchResult {  expandedGroups {    ...ExpandedGroupExpandedGroup    __typename  }  __typename}fragment ExpandedGroupExpandedGroup on ExpandedGroup {  listings {    ...HitListing    ...MapHitListing    __typename  }  mapViewport {    neLat    neLong    swLat    swLong    __typename  }  __typename}fragment MapHitListing on Listing {  ...HitListing  geoCode {    latitude    longitude    __typename  }  __typename}fragment FilterCountsSearchRequestResult on SearchResult {  id  resultCount  filterGroups {    groupInfo {      name      id      __typename    }    filters {      count @include(if: $filterCounts)      checked      filter {        id        name        refineByQueryArgument        description        __typename      }      __typename    }    __typename  }  __typename}fragment MapSearchResult on SearchResult {  mapViewport {    neLat    neLong    swLat    swLong    __typename  }  page  pageSize  listings {    ...MapHitListing    __typename  }  pinnedListing {    listing {      ...MapHitListing      __typename    }    __typename  }  __typename}fragment PagerSearchResult on SearchResult {  fromRecord  toRecord  pageSize  pageCount  page  resultCount  __typename}fragment DestinationMessageSearchResult on SearchResult {  destinationMessage(assetVersion: 4) {    iconTitleText {      title      message      icon      messageValueType      link {        linkText        linkHref        __typename      }      __typename    }    ...DestinationMessageDestinationMessage    __typename  }  __typename}fragment DestinationMessageDestinationMessage on DestinationMessage {  iconText {    message    icon    messageValueType    __typename  }  __typename}fragment ADLSearchResult on SearchResult {  parsedParams {    q    coreFilters {      adults      children      pets      minBedrooms      maxBedrooms      minBathrooms      maxBathrooms      minNightlyPrice      maxNightlyPrice      minSleeps      __typename    }    dates {      arrivalDate      departureDate      __typename    }    sort    __typename  }  page  pageSize  pageCount  resultCount  fromRecord  toRecord  pinnedListing {    listing {      listingId      __typename    }    __typename  }  listings {    listingId    __typename  }  filterGroups {    filters {      checked      filter {        groupId        id        __typename      }      __typename    }    __typename  }  geography {    lbsId    name    description    location {      latitude      longitude      __typename    }    primaryGeoType    breadcrumbs {      name      countryCode      location {        latitude        longitude        __typename      }      primaryGeoType      __typename    }    __typename  }  __typename}fragment SearchTermCarouselSearchResult on SearchResult {  discoveryXploreFeeds {    results {      id      title      items {        ... on SearchDiscoveryFeedItem {          type          imageHref          place {            uuid            name {              full              simple              __typename            }            __typename          }          __typename        }        __typename      }      __typename    }    __typename  }  typeaheadSuggestion {    name    __typename  }  __typename}fragment InternalToolsSearchResult on SearchResult {  internalTools {    searchServiceUrl    __typename  }  __typename}fragment SEOMetaDataParamsSearchResult on SearchResult {  page  resultCount  pageSize  geography {    name    lbsId    breadcrumbs {      name      __typename    }    __typename  }  __typename}fragment GlobalInlineMessageSearchResult on SearchResult {  globalMessages {    ...GlobalInlineAlertGlobalMessages    __typename  }  __typename}fragment GlobalInlineAlertGlobalMessages on GlobalMessages {  alert {    action {      link {        href        text {          value          __typename        }        __typename      }      __typename    }    body {      text {        value        __typename      }      link {        href        text {          value          __typename        }        __typename      }      __typename    }    id    severity    title {      value      __typename    }    __typename  }  __typename}fragment GlobalBannerContainerSearchResult on SearchResult {  globalMessages {    ...GlobalBannerGlobalMessages    __typename  }  __typename}fragment GlobalBannerGlobalMessages on GlobalMessages {  banner {    body {      text {        value        __typename      }      link {        href        text {          value          __typename        }        __typename      }      __typename    }    id    severity    title {      value      __typename    }    __typename  }  __typename}"
    }

    const response = await axios.post('/serp/g', requstBody)
    return(response.data.data.results.listings)
}
