Redmine gitmike-design theme
==============

This is the theme of the design easy for beginners to understand Redmine. 
It is based on A1 theme version 1.0.3 by Kirill Bezrukov www.redminecrm.com.

## Screenshot[screenshot1]: https://github.com/artlife3/redmine-theme-gitmike-design/blob/master/screenshot/backlog_01.png?raw=true "gitmike-design screenshot"
[screenshot2]: https://github.com/artlife3/redmine-theme-gitmike-design/blob/master/screenshot/backlog_kanban_01.png?raw=true "gitmike-design screenshot"

[screenshot3]: https://github.com/artlife3/redmine-theme-gitmike-design/blob/master/screenshot/issue.png?raw=true "gitmike-design screenshot"
![gitmike screenshot][screenshot1]
![gitmike screenshot][screenshot2]
![gitmike screenshot][screenshot3]

## Feature
1. The design reflected in the structure of the backlog plugin and redmine. 
1. Automatic expansion and contraction of the search form. 
1. To change the position of project change selector. 
1. Slide of the personal settings section. 
1. Redmine Backlogs support.

## Concept
* There are people that dislike the redmine. 
* Redmine is not a cause, it is in the design? 
* this is designed to put up this hypothesis.


## Installation

```
cd redmine/public/theme
git clone git://github.com/artlife3/redmine-theme-gitmike-design.git .
```
### Change theme
Open redmine on a browser and go to Administration > Settings > Display > Theme.

### Backlog Plugin edit

It allows you to use the theme.js by performing the following editing.

redmine/plugins/redmine_backlogs/app/views/layouts/rb.html.erb

```
11 <% if Backlogs.setting[:show_redmine_std_header] %>
12 - <%= stylesheet_link_tag 'application', :media => 'all' %>
13 <%= stylesheet_link_tag 'rtl', :media => 'all' if l(:direction) == 'rtl' %>
14 <% end %>

21 <%= yield :head_tags -%>
22 + <%= heads_for_theme %>
23 + <% if Backlogs.setting[:show_redmine_std_header] %>
24 + <%= stylesheet_link_tag 'application', :media => 'all' %>
25 + <% end %>
```
support backlog plugin version v 1.0.6
## License

GPL3

## Change Log

* r8: issue page design.
* r7: backlog,kanban page desgin.