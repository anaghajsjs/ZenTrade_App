$(document).ready(function ()
{
    "use strict";

    // =================================================================
    // Pages
    // =================================================================

    function AddLedgerPage(root)
    {
        var self = this;

        self.name = ko.observable('');
        self.description = ko.observable('');
        self.friends = ko.observableArray([]);

        self.commitForm = function ()
        {
            // Prepare Data
            var data = {},
                ledger,
                ledgerCategory;

            data.name = self.name();
            data.description = self.description();
            data.friends = self.friends();

            data.ledgerId = moment().valueOf(); // NOTE: Temporary id for now
            data.dateModified = moment().valueOf();

            ledger = new Ledger(data, root);

            // Add to respective Ledger Category
            ledgerCategory = ko.utils.arrayFirst(root.ledgerCategories(), function (rootLedgerCategory)
            {
                return rootLedgerCategory.name() === 'Mine';
            });

            ledgerCategory.addLedger(ledger);

            // Reset Form
            self.resetLedger();

            return true; // This will allow the default click action
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
            self.resetLedger();
            return true;
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
        self.currencyCode = ko.observable(root.defaultCurrencyCode);

        self.commitForm = function ()
        {
            // Prepare Data
            var data = {},
                ledgerEntry;

            data.name = self.name();
            data.totalAmount = self.totalAmount();
            data.currencyCode = self.currencyCode();

            data.ledgerEntryId = moment().valueOf(); // NOTE: Temporary id for now
            data.dateModified = moment().valueOf();
            data.friends = [];

            ledgerEntry = new LedgerEntry(data, root);

            // Add to respective Ledger
            parentLedger.addLedgerEntry(ledgerEntry);

            // Reset Form
            self.resetLedgerEntry();

            return true; // This will allow the default click action
        };

        self.resetLedgerEntry = function ()
        {
            self.name('');
            self.totalAmount(0.00);
            self.currencyCode(root.defaultCurrencyCode);
        };

        self.resetForm = function (data, event)
        {
            self.resetLedgerEntry();
            return true;
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
            console.log("FORM COMMITTED");

            parentLedger.name(self.name());
            parentLedger.description(self.description());
            parentLedger.friends(self.friends());
            parentLedger.dateModified(moment().valueOf());

            return true; // This will allow the default click action
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
            console.log("RESET FORM");

            self.resetLedger();
            return true;
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
	
	function EditLedgerEntryPage(parentLedgerEntry, root)
	{
		var self = this;
		
		self.name = ko.observable(parentLedgerEntry.name());
        self.totalAmount = ko.observable(parentLedgerEntry.totalAmount());
        self.currencyCode = ko.observable(parentLedgerEntry.currencyCode());
		
		self.commitForm = function ()
        {
            console.log("FORM COMMITTED");

            parentLedgerEntry.name(self.name());
            parentLedgerEntry.totalAmount(self.totalAmount());
            parentLedgerEntry.currencyCode(self.currencyCode());

            return true; // This will allow the default click action
        };
		
		self.resetLedgerEntry = function ()
        {
            self.name(parentLedgerEntry.name());
            self.totalAmount(parentLedgerEntry.totalAmount());
            self.currencyCode(parentLedgerEntry.currencyCode());
        };

        self.resetForm = function (data, event)
        {
            console.log("RESET FORM");

            self.resetLedgerEntry();
            return true;
        };
	}
	
    // =================================================================

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
			self.share = ko.observable(data.share);
			self.paid = ko.observable(data.paid);
			
			self.sharePercentage = ko.computed({
				read: function() {
					var share = parseFloat(self.share()),
						totalAmount = parseFloat(data.ledgerEntry.totalAmount());
					
					return ((share / totalAmount) * 100);
				},
				write: function(value)
				{
					var totalAmount = parseFloat(data.ledgerEntry.totalAmount()),
						value = parseFloat(value);
					
					self.share(totalAmount * value);
				},
				owner: this
			});
			
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

        self.dateModified = ko.observable(moment(data.dateModified).fromNow());
        self.dateModifiedFromNow = ko.computed(function ()
        {
            return moment(self.dateModified).fromNow();
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
            return moment(self.dateModified).fromNow();
        }, self);
        self.lastModifiedBy = ko.observable(data.lastModifiedBy);

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

        /* PAGES */
        self.editLedgerPage = new EditLedgerPage(self, root);
        self.addLedgerEntryPage = new AddLedgerEntryPage(self, root);

        /* FUNCTIONS */
        self.addLedgerEntry = function (data)
        {
            self.ledgerEntries.push(data);
            self.ledgerEntries.valueHasMutated();
        };

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
            if(self.name() == 'Archived')
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
            self.ledgers.push(data);
            self.ledgers.valueHasMutated();
        };

        self.deleteLedger = function (ledger)
        {
			console.log(self.ledgers().length);
            self.ledgers.remove(function (item)
            {
                return item.ledgerId() == ledger.ledgerId();
            });
			console.log(self.ledgers().length);
            self.ledgers.valueHasMutated();
        };

        /* LINKS */
        self.ledgerCategoryHref = ko.computed(function ()
        {
            return '#ledgers_' + self.name();
        }, self);
        self.ledgerCategoryHTMLId = ko.computed(function ()
        {
            return 'ledgers_' + self.name();
        }, self);
    }

    function LedgersViewModel()
    {
        var self = this;

        /* PROPERTIES */
        self.defaultCurrencyCode = ko.observable();
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
                var mappedLedgerCategories = [];
                mappedLedgerCategories = ko.utils.arrayMap(data.ledgerCategories, function (item)
                {
                    return new LedgerCategory(item, self);
                });
                self.ledgerCategories(mappedLedgerCategories);

                self.defaultCurrencyCode(data.defaultCurrencyCode);
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
            // Remove ledger from source ledger
            sourceLedgerCategory.deleteLedger(ledger);

            // Insert into destination ledger category
            destinationLedgerCategory.addLedger(ledger);
        };
		
		self.toggleArchiveLedger = function (ledger, sourceLedgerCategory)
		{
			var destinationLedgerCategory;
			
			if(sourceLedgerCategory.name() == "Archived")
			{
				if(ledger.createdBy().id == self.activeUser.id)
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
    }

	/* CUSTOM BINDINGS */
	ko.bindingHandlers.jqmRangeSlider = {
		init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			console.log("jqmRangeSlider INIT");
			
			var value = valueAccessor(),
				allBindings = allBindingsAccessor(),
				valueUnwrapped = ko.unwrap(value);
			
			$( element ).attr( 'value', valueUnwrapped );
		},
		update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
			console.log("jqmRangeSlider UPDATE");
			
			var value = valueAccessor(),
				allBindings = allBindingsAccessor(),
				valueUnwrapped = ko.unwrap(value);
			
			if($.mobile !== undefined){
				$( element ).attr( 'value', valueUnwrapped );
				
			}
		}
	};

    ko.applyBindings(new LedgersViewModel());
	
	
});