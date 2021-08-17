# scratch-api
## Assumptions
This application would be heavy read and not updated that frequently. It is fair to say that once added, there won't be many changes to individual clinics. What is more, they take quite the resources to be built, so they won't be popping here and there. This train of thought could lead us to an in-memory cache, refreshed from time to time (how often?).

**Total number of clinics**
A quick google search shows that there are currently 187 thousand dental offices. Granted, those are not clinics, but we can use it as an upper metric of the possible number of those clinics. For vet clinics, it shows 32 thousand, so we can round the total at about 250 thousand, to be on the safe side and keep in mind future additions.

**Total memory**
Using inspiration from [calculating object bytes](https://stackoverflow.com/a/63805778/5396280), a.k.a. stealing, we can say that a single object would take around 100 bytes. I can imagine that more information would be added, like address, description, staff. Let's assume that in the future, a single object would reach 1KB. So we would have data for roughly 250 000 KB or 250 MB - nothing intimidating for holding in-memory.

**Grouping**
One of the requirements for searching is by state. States are a limited, small number and are therefore perfect for grouping objects. Another criteria for search is by opening and closing hours. Hours are also limited and are therefore another good candidate for grouping. I believe it is safe to assume that opening hours are either at the half hour or at the hour (e.g. 7:30 or 7:00). Searching by name would happen after filtering by the other criteria.