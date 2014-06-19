$(document).bind("mobileinit", function ()
{
    "use strict";

    /* =============================
     * Pages
     * =============================
     */

    function AddLedgerPage(root)
    {
        var self = this;

        self.name = ko.observable('');
        self.description = ko.observable('');
        self.friends = ko.observableArray([]);

        self.commitForm = function ()
        {
            /* Prepare Data */
            var data = {},
                ledger,
                ledgerCategory;

            data.name = self.name();
            data.description = self.description();
            data.friends = self.friends();

            /* NOTE: Temporary id for now */
            data.ledgerId = moment().valueOf();
            data.dateModified = moment().valueOf();
            data.lastModifiedBy = root.activeUser;

            ledger = new Ledger(data, root);

            /* Add to respective Ledger Category */
            ledgerCategory = ko.utils.arrayFirst(root.ledgerCategories(), function (rootLedgerCategory)
            {
                return rootLedgerCategory.name() === 'Mine';
            });

            ledgerCategory.addLedger(ledger);

            /* NOTE: Placeholder dialogs */
            alert("Your data has been saved to the database.");

            /* Reset Form */
            self.resetLedger();

            /* This will allow the default click action */
            return true;
        };

        self.isSelectedFriend = function (data)
        {
            var exists = ko.utils.arrayFirst(self.friends(), function (friend)
            {
                return friend.id === data.id;
            });

            if (exists === null)
            {
                return false;
            }
            else
            {
                return true;
            }
        };

        self.resetLedger = function ()
        {
            self.name('');
            self.description('');
            self.friends([]);
        };

        self.resetForm = function (data, event)
        {
            /* NOTE: Placeholder dialogs */
            var dialog = confirm("Your changes will not be saved. Are you sure you want to abandon your changes?");
            if (dialog == true)
            {
                self.resetLedger();
                return true;
            }
            else
            {
                return false;
            }
        };

        self.toggleSelectedFriend = function (data, event)
        {
            var exists = ko.utils.arrayFirst(self.friends(), function (friend)
            {
                return friend.id === data.id;
            });

            if (exists === null)
            {
                self.friends.push(data);
                self.friends.valueHasMutated();
            }
            else
            {
                self.friends.remove(function (item)
                {
                    return item.id == data.id;
                });
                self.friends.valueHasMutated();
            }
        };
    }

    function AddLedgerEntryPage(parentLedger, root)
    {
        var self = this;

        self.name = ko.observable('');
        self.totalAmount = ko.observable(0.00);
        self.currencies = ko.observable(root.currencies());
        self.currencyCode = ko.observable(root.defaultCurrencyCode());
        self.defaultCurrencyCode = ko.observable(root.defaultCurrencyCode());

        self.commitForm = function ()
        {
            /* Prepare Data */
            var data = {},
                ledgerEntry;

            data.name = self.name();
            data.totalAmount = self.totalAmount();
            data.currencyCode = self.currencyCode();

            /*  NOTE: Temporary id for now */
            data.ledgerEntryId = moment().valueOf();
            data.friends = parentLedger.friends();
            data.dateModified = moment().valueOf();
            data.lastModifiedBy = root.activeUser;

            ledgerEntry = new LedgerEntry(data, root);

            /* Add to respective Ledger  */
            parentLedger.addLedgerEntry(ledgerEntry);

            /* NOTE: Placeholder dialogs */
            alert("Your data has been saved to the database.");

            /* Reset Form */
            self.resetLedgerEntry();

            /* This will allow the default click action */
            return true;
        };

        self.resetLedgerEntry = function ()
        {
            self.name('');
            self.totalAmount(0.00);
            self.currencyCode(root.defaultCurrencyCode());
        };

        self.resetForm = function (data, event)
        {
            /* NOTE: Placeholder dialogs */
            var dialog = confirm("Your changes will not be saved. Are you sure you want to abandon your changes?");
            if (dialog == true)
            {
                self.resetLedgerEntry();
                return true;
            }
            else
            {
                return false;
            }
        };
    }

    function EditLedgerPage(parentLedger, root)
    {
        var self = this;

        self.name = ko.observable(parentLedger.name());
        self.description = ko.observable(parentLedger.description());
        self.friends = ko.observableArray(parentLedger.friends());

        self.commitForm = function ()
        {
            parentLedger.name(self.name());
            parentLedger.description(self.description());
            parentLedger.friends(self.friends());
            parentLedger.dateModified(moment().valueOf());

            /* NOTE: Placeholder dialogs */
            alert("Your data has been saved to the database.");

            /* This will allow the default click action */
            return true;
        };

        self.isSelectedFriend = function (data)
        {
            var exists = ko.utils.arrayFirst(self.friends(), function (friend)
            {
                return friend.id === data.id;
            });

            if (exists === null)
            {
                return false;
            }
            else
            {
                return true;
            }
        };

        self.resetLedger = function ()
        {
            self.name(parentLedger.name());
            self.description(parentLedger.description());
            self.friends(parentLedger.friends());
        };

        self.resetForm = function (data, event)
        {
            /* NOTE: Placeholder dialogs */
            var dialog = confirm("Your changes will not be saved. Are you sure you want to abandon your changes?");
            if (dialog == true)
            {
                self.resetLedger();
                return true;
            }
            else
            {
                return false;
            }
        };

        self.toggleSelectedFriend = function (data, event)
        {
            var exists = ko.utils.arrayFirst(self.friends(), function (friend)
            {
                return friend.id === data.id;
            });

            if (exists === null)
            {
                self.friends.push(data);
                self.friends.valueHasMutated();
            }
            else
            {
                self.friends.remove(function (item)
                {
                    return item.id == data.id;
                });
                self.friends.valueHasMutated();
            }
        };

        self.markLedgerForDeletion = function (ledger, ledgerCategory)
        {
            /* NOTE: Placeholder dialogs */
            var dialog = confirm("Are you sure you want to delete?");
            if (dialog == true)
            {
                root.ledgersMarkedForDeletion.push(
                {
                    'ledger': ledger,
                    'ledgerCategory': ledgerCategory
                });

                return true;
            }
            else
            {
                return false;
            }
        };
    }

    function EditLedgerEntryPage(parentLedgerEntry, root)
    {
        var self = this;

        self.name = ko.observable(parentLedgerEntry.name());
        self.totalAmount = ko.observable(parentLedgerEntry.totalAmount());
        self.currencies = ko.observable(root.currencies());
        self.currencyCode = ko.observable(parentLedgerEntry.currencyCode());
        self.defaultCurrencyCode = ko.observable(root.defaultCurrencyCode());

		/* FUNCTIONS */
        self.commitForm = function ()
        {
            parentLedgerEntry.name(self.name());
            parentLedgerEntry.totalAmount(self.totalAmount());
            parentLedgerEntry.currencyCode(self.currencyCode());
            parentLedgerEntry.dateModified(moment().valueOf());

            /* NOTE: Placeholder dialogs */
            alert("Your data has been saved to the database.");

            /* This will allow the default click action */
            return true;
        };

        self.resetLedgerEntry = function ()
        {
            self.name(parentLedgerEntry.name());
            self.totalAmount(parentLedgerEntry.totalAmount());
            self.currencyCode = ko.observable(parentLedgerEntry.currencyCode());
        };

        self.resetForm = function (data, event)
        {
            /* NOTE: Placeholder dialogs */
            var dialog = confirm("Your changes will not be saved. Are you sure you want to abandon your changes?");
            if (dialog == true)
            {
                self.resetLedgerEntry();
                return true;
            }
            else
            {
                return false;
            }
        };

        self.markLedgerEntryForDeletion = function (ledgerEntry, ledger)
        {
            /* NOTE: Placeholder dialogs */
            var dialog = confirm("Are you sure you want to delete?");
            if (dialog == true)
            {
                root.ledgerEntriesMarkedForDeletion.push(
                {
                    'ledgerEntry': ledgerEntry,
                    'ledger': ledger
                });

                return true;
            }
            else
            {
                return false;
            }
        };
    }
	
	function EditPersonLedgerDetailsPage(parentFriend, root)
	{
		var self = this;
		
		self.parentLedgerEntry = parentFriend.parentLedgerEntry;
		
		self.share = ko.observable(parentFriend.share()).extend(
		{
			numeric: 2
		});

		self.sharePercentage = ko.computed(
		{
			read: parentFriend.readsharePercentage,
			write: parentFriend.writesharePercentage,
			owner: self
		});
		self.paid = ko.observable(parentFriend.paid());
		
		/* FUNCTIONS */
		self.commitForm = function ()
        {
            parentFriend.share(self.share());
            parentFriend.sharePercentage(self.sharePercentage());
            parentFriend.paid(self.paid());
            parentFriend.parentLedgerEntry.dateModified(moment().valueOf());

            /* NOTE: Placeholder dialogs */
            alert("Your data has been saved to the database.");

            /* This will allow the default click action */
            return true;
        };
		
		self.resetPersonLedgerDetailsPage = function ()
        {
            self.share(parentFriend.share());
            self.sharePercentage(parentFriend.sharePercentage());
            self.paid = ko.observable(parentFriend.paid());
        };

        self.resetForm = function (data, event)
        {
            /* NOTE: Placeholder dialogs */
            var dialog = confirm("Your changes will not be saved. Are you sure you want to abandon your changes?");
            if (dialog == true)
            {
                self.resetPersonLedgerDetailsPage();
                return true;
            }
            else
            {
                return false;
            }
        };
	}

    /* 
     * =======================================
     * Models and ViewModels
     * =======================================
     */

    function Friend(data, root)
    {
        var self = this;

        /* PROPERTIES */
        self.id = data.id;
        self.name = data.name;
        self.picture = data.picture;

        /* Specific properties ofr ledger entry friends */
        if (typeof data.ledgerEntry != 'undefined')
        {
			self.parentLedgerEntry = data.ledgerEntry;
			
			/* FUNCTIONS */
			self.readsharePercentage = function()
			{
				var self = this,				
					share = parseFloat(self.share()),
                        totalAmount = parseFloat(self.parentLedgerEntry.totalAmount()),
                        roundingMultiplier = Math.pow(10, 2),
                        sharePercentageValue;

				if (isNaN(share) == true)
				{
					share = 0;
				}

				sharePercentageValue = ((share / totalAmount) * 100),

				/* Round off */
				sharePercentageValue = Math.round(sharePercentageValue * roundingMultiplier) / roundingMultiplier;

				return sharePercentageValue;
			};
			
			self.writesharePercentage = function(value)
			{
				var self = this;
				
				 if (isNaN(value) == false)
                    {
                        var totalAmount = parseFloat(self.parentLedgerEntry.totalAmount()),
                            parsedValue = parseFloat(value),
                            newShare = totalAmount * (parsedValue / 100),
                            roundingMultiplier = Math.pow(10, 2);

                        /* Round off */
                        newShare = Math.round(newShare * roundingMultiplier) / roundingMultiplier;

                        self.share(newShare);
                    }
			};
			
			/* PROPERTIES */
            var dataShare = parseFloat(data.share),
                dataPaid = parseFloat(data.paid);

            if (isNaN(dataShare) === true)
            {
                dataShare = 0;
            }

            if (isNaN(dataPaid) === true)
            {
                dataPaid = 0;
            }

            self.share = ko.observable(dataShare).extend(
            {
                numeric: 2
            });
			
            self.sharePercentage = ko.computed(
            {
                read: self.readsharePercentage,
                write: self.writesharePercentage,
                owner: self
            });
            self.paid = ko.observable(dataPaid);
			
			/* PAGES */
			self.editPersonLedgerDetailsPage = new EditPersonLedgerDetailsPage(self, root);
			

			/* LINKS */
            self.personLedgerDetailsHref = ko.computed(function ()
            {
                return '#person_ledger_details_' + data.ledgerEntry.ledgerEntryId() + '_' + self.id;
            }, self);
            self.personLedgerDetailsHTMLId = ko.computed(function ()
            {
                return 'person_ledger_details_' + data.ledgerEntry.ledgerEntryId() + '_' + self.id;
            }, self);
        }
    }

    function LedgerEntry(data, root)
    {
        var self = this,
            mappedFriends = [];

        /* PROPERTIES */
        self.name = ko.observable(data.name);
        self.ledgerEntryId = ko.observable(data.ledgerEntryId);
        self.totalAmount = ko.observable(data.totalAmount);

        self.currencyCode = ko.observable(data.currencyCode);
        self.dateCreated = ko.observable(data.dateCreated);

        self.dateModified = ko.observable(data.dateModified);
        self.dateModifiedFromNow = ko.computed(function ()
        {
            return moment(self.dateModified()).fromNow();
        }, self);

        self.friends = ko.observableArray([]);
        mappedFriends = ko.utils.arrayMap(data.friends, function (friend)
        {
            var person = root.getPerson(friend.id);
            person.ledgerEntry = self;
            person.share = friend.share;
            person.paid = friend.paid;

            return new Friend(person, root);
        });
        self.friends(mappedFriends);

        self.lastModifiedBy = ko.observable(data.lastModifiedBy);
        self.lastModifiedByName = ko.computed(function ()
        {
            var person = ko.utils.arrayFirst(root.persons(), function (person)
            {
                return self.lastModifiedBy().id == person.id;
            });

            return person.name;
        });

        self.totalFriendsPaid = ko.computed(function ()
        {
            var sum = 0;

            ko.utils.arrayForEach(self.friends(), function (item)
            {
                sum += parseFloat(item.paid());
            });

            return sum;
        });

        /* PAGES */
        self.editLedgerEntryPage = new EditLedgerEntryPage(self, root);

        /* LINKS */
        self.editLedgerEntryHref = ko.computed(function ()
        {
            return '#edit_ledger_entry_' + self.ledgerEntryId();
        }, self);
        self.editLedgerEntryHTMLId = ko.computed(function ()
        {
            return 'edit_ledger_entry_' + self.ledgerEntryId();
        }, self);
        self.ledgerEntryPeopleHref = ko.computed(function ()
        {
            return '#ledger_entry_people_' + self.ledgerEntryId();
        }, self);
        self.ledgerEntryPeopleHTMLId = ko.computed(function ()
        {
            return 'ledger_entry_people_' + self.ledgerEntryId();
        }, self);

    }

    function Ledger(data, root)
    {
        var self = this,
            mappedFriends, mappedLedgerEntries = [];

        /* PROPERTIES */
        self.ledgerId = ko.observable(data.ledgerId);
        self.name = ko.observable(data.name);
        self.description = ko.observable(data.description);
        self.createdBy = ko.observable(data.createdBy);
        self.dateCreated = ko.observable(data.dateCreated);
        self.dateModified = ko.observable(data.dateModified);
        self.dateModifiedFromNow = ko.computed(function ()
        {
            return moment(self.dateModified()).fromNow();
        }, self);
        self.lastModifiedBy = ko.observable(data.lastModifiedBy);
        self.lastModifiedByName = ko.computed(function ()
        {
            var person = ko.utils.arrayFirst(root.persons(), function (person)
            {
                return self.lastModifiedBy().id == person.id;
            });

            return person.name;
        });

        self.ledgerEntries = ko.observableArray([]);
        if (typeof data.ledgerEntries != 'undefined' && data.ledgerEntries.length > 0)
        {
            mappedLedgerEntries = ko.utils.arrayMap(data.ledgerEntries, function (item)
            {
                return new LedgerEntry(item, root);
            });
        }
        self.ledgerEntries(mappedLedgerEntries);

        self.friends = ko.observableArray([]);
        mappedFriends = ko.utils.arrayMap(data.friends, function (friend)
        {
            return new Friend(root.getPerson(friend.id), root);
        });
        self.friends(mappedFriends);

        self.totalAmount = ko.computed(function ()
        {
            var sum = 0;

            ko.utils.arrayForEach(self.ledgerEntries(), function (item)
            {
                sum += parseFloat(item.totalAmount());
            });

            return sum;
        });

        self.totalLedgerEntriesPaid = ko.computed(function ()
        {
            var sum = 0;

            ko.utils.arrayForEach(self.ledgerEntries(), function (item)
            {
                sum += parseFloat(item.totalFriendsPaid());
            });

            return sum;
        });

        /* PAGES */
        self.editLedgerPage = new EditLedgerPage(self, root);
        self.addLedgerEntryPage = new AddLedgerEntryPage(self, root);

        /* FUNCTIONS */
        self.addLedgerEntry = function (data)
        {
            self.ledgerEntries.valueWillMutate();
            self.ledgerEntries.push(data);
            self.ledgerEntries.valueHasMutated();
        };

        self.deleteLedgerEntry = function (ledgerEntry)
        {
            self.ledgerEntries.valueWillMutate();
            self.ledgerEntries.remove(function (item)
            {
                return item.ledgerEntryId() == ledgerEntry.ledgerEntryId();
            });
            self.ledgerEntries.valueHasMutated();
        };

        /* Notify subscribers of dateModified every minute */
        setInterval(function ()
        {
            $.each(self.ledgerEntries(), function (index, item)
            {
                item.dateModified.notifySubscribers();
            });
        }, 60 * 1000); // 60 * 1000 milsec

        /* LINKS */
        self.addLedgerEntryHref = ko.computed(function ()
        {
            return '#add_ledger_entry_' + this.ledgerId();
        }, self);
        self.addLedgerEntryHTMLId = ko.computed(function ()
        {
            return 'add_ledger_entry_' + this.ledgerId();
        }, self);
        self.editLedgerHref = ko.computed(function ()
        {
            return '#edit_ledger_' + this.ledgerId();
        }, self);
        self.editLedgerHTMLId = ko.computed(function ()
        {
            return 'edit_ledger_' + this.ledgerId();
        }, self);
        self.ledgerEntriesHref = ko.computed(function ()
        {
            return '#ledger_entries_' + this.ledgerId();
        }, self);
        self.ledgerEntriesHTMLId = ko.computed(function ()
        {
            return 'ledger_entries_' + this.ledgerId();
        }, self);
        self.editLedgerPeopleHref = ko.computed(function ()
        {
            return '#edit_ledger_people_' + this.ledgerId();
        }, self);
        self.editLedgerPeopleHTMLId = ko.computed(function ()
        {
            return 'edit_ledger_people_' + this.ledgerId();
        }, self);
    }

    function LedgerCategory(data, root)
    {
        var self = this,
            mappedLedgers = [];

        /* PROPERTIES */
        self.name = ko.observable(data.name);

        self.ledgers = ko.observableArray([]);
        mappedLedgers = ko.utils.arrayMap(data.ledgers, function (item)
        {
            return new Ledger(item, root);
        });
        self.ledgers(mappedLedgers);

        self.toggleArchiveText = ko.computed(function ()
        {
            if (self.name() == 'Archived')
            {
                return 'Unarchive';
            }
            else
            {
                return 'Archive';
            }
        }, self);

        /* FUNCTIONS */
        self.addLedger = function (data)
        {
            self.ledgers.valueWillMutate();
            self.ledgers.push(data);
            self.ledgers.valueHasMutated();
        };

        self.deleteLedger = function (ledger)
        {
            self.ledgers.valueWillMutate();
            self.ledgers.remove(function (item)
            {
                return item.ledgerId() == ledger.ledgerId();
            });
            self.ledgers.valueHasMutated();
        };

        /* Notify subscribers of dateModified every minute */
        setInterval(function ()
        {
            $.each(self.ledgers(), function (index, item)
            {
                item.dateModified.notifySubscribers();
            });
        }, 60 * 1000); // 60 * 1000 milsec

        /* LINKS */
        self.ledgerCategoryHref = ko.computed(function ()
        {
            return '#ledgers_' + self.name();
        }, self);
        self.ledgerCategoryHTMLId = ko.computed(function ()
        {
            return 'ledgers_' + self.name();
        }, self);

        self.ledgerCategoryMainMenuHref = ko.computed(function ()
        {
            return '#main_menu_' + self.name();
        }, self);
        self.ledgerCategoryMainMenuHTMLId = ko.computed(function ()
        {
            return 'main_menu_' + self.name();
        }, self);
    }

    function LedgersViewModel()
    {
        var self = this;

        /* PROPERTIES */
        self.defaultCurrencyCode = ko.observable();
        self.currencies = ko.observableArray([]);
        self.activeUser = {
            'id': 588183891
        };

        self.ledgerCategories = ko.observableArray([]);
        self.persons = ko.observableArray([]);

        $.getJSON('data/fb.json', function (persons)
        {
            var mappedPersons = ko.utils.arrayMap(persons, function (person)
            {
                return new Friend(person, self);
            });
            self.persons(mappedPersons);

            $.getJSON('data/app.json', function (data)
            {
                self.defaultCurrencyCode(data.defaultCurrencyCode);
                self.currencies(data.currencies);

                var mappedLedgerCategories = [];
                mappedLedgerCategories = ko.utils.arrayMap(data.ledgerCategories, function (item)
                {
                    return new LedgerCategory(item, self);
                });
                self.ledgerCategories(mappedLedgerCategories);
            });
        });

        /* PAGES */
        self.addLedgerPage = new AddLedgerPage(self);

        /* FUNCTIONS */
        self.getPerson = function (Id)
        {
            return ko.utils.arrayFirst(self.persons(), function (person)
            {
                return person.id == Id;
            });
        };

        self.getLedgerCategory = function (name)
        {
            return ko.utils.arrayFirst(self.ledgerCategories(), function (ledgerCategory)
            {
                return ledgerCategory.name() == name;
            });
        };

        self.moveLedgerToCategory = function (ledger, sourceLedgerCategory, destinationLedgerCategory)
        {
            /* Remove ledger from source ledger */
            sourceLedgerCategory.deleteLedger(ledger);

            /* Insert into destination ledger category */
            destinationLedgerCategory.addLedger(ledger);
        };

        self.toggleArchiveLedger = function (ledger, sourceLedgerCategory)
        {
            var destinationLedgerCategory;

            if (sourceLedgerCategory.name() == "Archived")
            {
                if (ledger.createdBy().id == self.activeUser.id)
                {
                    destinationLedgerCategory = self.getLedgerCategory('Mine');
                }
                else
                {
                    destinationLedgerCategory = self.getLedgerCategory('Shared');
                }
            }
            else
            {
                destinationLedgerCategory = self.getLedgerCategory('Archived');
            }

            self.moveLedgerToCategory(ledger, sourceLedgerCategory, destinationLedgerCategory);
        };

        /* These variables are used to store ledgers and ledgers entries that are supposed to be deleted inline.
         * We can't delete inline because the data on that page would be destroyed and we can't navigate back.
         * Therefore, we use the approach of "marking" ledgers/ledger entries to be deleted where the actual
         * deletion is done on a safe page
         *
         * */
        self.ledgersMarkedForDeletion = [];
        self.ledgerEntriesMarkedForDeletion = [];
    }

    /* 
     * ====================================
     * CUSTOM KO EXTENDERS
     * ====================================
     */
    ko.extenders.numeric = function (target, precision)
    {
        /* create a writeable computed observable to intercept writes to our observable */
        var result = ko.computed(
        {
            read: target,
            /* always return the original observables value */
            write: function (newValue)
            {
                var current = target(),
                    roundingMultiplier = Math.pow(10, precision),
                    newValueAsNum = isNaN(newValue) ? 0 : parseFloat(+newValue),
                    valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;

                /* only write if it changed */
                if (valueToWrite !== current)
                {
                    target(valueToWrite);
                }
                else
                {
                    /* if the rounded value is the same, but a different value was written, force a notification for the current field */
                    if (newValue !== current)
                    {
                        target.notifySubscribers(valueToWrite);
                    }
                }
            }
        });

        /* initialize with current value to make sure it is rounded appropriately */
        result(target());

        /* return the new computed observable */
        return result;
    };

    ko.applyBindings(new LedgersViewModel());

    /*
     * ====================================
     * JQUERY MOBILE BINDINGS
     * ====================================
     */
    $(document).on("pageshow", '.ledgers-global', function (event)
    {
        var context = ko.contextFor(this);

        /* Code to delete marked ledgers when the list of ledger pages is shown */
        $.each(context.$root.ledgersMarkedForDeletion, function (index, item)
        {
            item.ledgerCategory.deleteLedger(item.ledger);
        });

        /* Refresh list so that new elements will be markupped properly */
        $(event.currentTarget).find('ul.ui-listview').listview('refresh');
    });

    $(document).on("pageshow", '.ledger-entries-mobile', function (event)
    {
        var context = ko.contextFor(this);

        /* Code to delete marked ledger entries when list of ledger entries page is shown */
        $.each(context.$root.ledgerEntriesMarkedForDeletion, function (index, item)
        {
            item.ledger.deleteLedgerEntry(item.ledgerEntry);
        });

        /* Refresh list so that new elements will be markupped properly */
        $(event.currentTarget).find('ul.ui-listview').listview('refresh');
    });

    /* The codes here are for the share textfield and sharePercentage slider to work properly */
    $(document).on("pageshow", '.person-ledger-details-mobile', function (event)
    {
        var shareElement = $(event.currentTarget).find("input[name='sharing']"),
            sliderSharePercentageElement = $(event.currentTarget).find("input[name='slider-percent']"),
            context = ko.contextFor(this);

        context.$data.share.subscribe(function (newValue)
        {
            sliderSharePercentageElement.val(context.$data.sharePercentage());
            sliderSharePercentageElement.slider('refresh');
        });

        sliderSharePercentageElement.bind("change", function (event, ui)
        {
            var newValue = $(event.currentTarget).val(),
                parsedValue = parseFloat(newValue);
				
            if (parsedValue != context.$data.sharePercentage())
            {
                context.$data.sharePercentage(parsedValue);
            }
        });
    });
});