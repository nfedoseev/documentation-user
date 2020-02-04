:banner: banners/contributing.png

===============
RST cheat sheet
===============

Headings
========

| For each formatting line (e.g., ``===``), write as many symbols (``=``) as there are characters in
  the header.
| The symbols used for the formatting are, in fact, not important. Only the order in which they are
  written matters, as it determines the size of the decorated heading. This means that you may
  encounter different heading formatting and in a different order, in which case you should follow
  the formatting in place in the document. In any other case, use the formatting shown below.

+--------------+---------------+-------------------------------+
| Heading size | Formatting    | Min/Max number of occurrences |
+==============+===============+===============================+
| H1           | | ``=======`` | 1/1                           |
|              | | ``Heading`` |                               |
|              | | ``=======`` |                               |
+--------------+---------------+-------------------------------+
| H2           | | ``Heading`` | 0/∞                           |
|              | | ``=======`` |                               |
+--------------+---------------+-------------------------------+
| H3           | | ``Heading`` | 0/∞                           |
|              | | ``-------`` |                               |
+--------------+---------------+-------------------------------+
| H4           | | ``Heading`` | 0/∞                           |
|              | | ``~~~~~~~`` |                               |
+--------------+---------------+-------------------------------+
| H5           | | ``Heading`` | 0/∞                           |
|              | | ``*******`` |                               |
+--------------+---------------+-------------------------------+
| H6           | | ``Heading`` | 0/∞                           |
|              | | ``^^^^^^^`` |                               |
+--------------+---------------+-------------------------------+

Markup
======

Inline markup
-------------

Use the following markups to emphasize your text to your liking:

+--------------+----------+
| \*\*Text\*\* | **Text** |
+--------------+----------+
| \*Text\*     | *Text*   |
+--------------+----------+
| \`\`Text\`\` | ``Text`` |
+--------------+----------+

Bulleted list
-------------

.. raw:: html

   <pre>This is a bulleted list.
   It has two items, the second
   item uses two lines.</pre>

.. code-block:: rst

   - This is a bulleted list.
   - It has two items, the second
     item uses two lines.

.. code-block:: rst

   * This is a bulleted list too.
   * The principle stays the same.

Numbered list
#. This is a numbered list.
#. Numbering is automatic.

1. This is a numbered list too.
2. Use this format for nested numbered lists
   or to force the numbering.
Nested lists
- This is the first bullet point.
  1. It has a nested numbered list
  2. with two elements.

Hyperlinks
Hyperlink references
Hyperlink references are links to a URL with a custom label. They follow this syntax: `label <URL>`_
Note: The URL can be a relative path to a file within the documentation.
Example
This excerpt of RST: For instance, `this is a hyperlink reference <https://odoo.com>`_. is rendered as follows in HTML: “For instance, this is a hyperlink reference.”
External hyperlink targets
External hyperlink targets allow creating shortcuts for hyperlink references. The definition syntax is as follows: .. _target: URL
There are two ways to reference them, depending on the use case:
target_ creates a hyperlink with the target name as label and the URL as reference. Notice that the _ moved after the target!
`label <target_>`_ does exactly what you expect: the label replaces the name of the target, and the target is replaced by the URL.
Example
RST
.. _proof-of-concept: https://en.wikipedia.org/wiki/Proof_of_concept

A proof-of-concept_ is a simplified version, a prototype of what is expected to agree on the main lines of expected changes. `PoC <proof-of-concept_>`_ is a common abbreviation.
HTML
A proof-of-concept is a simplified version, a prototype of what is expected to agree on the main lines of expected changes. PoC is a common abbreviation.
Internal hyperlink targets
Internal hyperlink targets follow the same syntax as external hyperlink targets but without any URL. Indeed, they are internal. The definition syntax is then: .. _target:
They allow referencing a specific part of a document by using the target as an anchor. When the user clicks on the reference, the documentation scrolls to the part of the page containing the target.
Note: Targets can be referenced from other files than the ones in which they are defined.
There are two ways to reference them, both using the ref directive:
:ref:`target` creates a hyperlink to the anchor with the heading defined below as label. Notice that the _ is no longer written!
:ref:`label <target>` creates a hyperlink to the anchor with the given label.
Example
RST
.. _sales/quotation/start-of-page:

… This can easily be done by creating a new product, see :ref:`product` for additional help.  ...

.. _sales/quotation/product:

How to create a product?
=========================

As explained at the :ref:`start of the page <start-of-page>`, ...
HTML
… This can easily be done by creating a new product, see How to create a product? for additional help.  ...

How to create a product?
As explained at the start of the page, ...
Implicit hyperlink targets
Implicit hyperlink targets are a special kind of internal hyperlink targets: they are automatically generated by section titles, footnotes, etc. Consequently, they don’t have a definition syntax.
They can be referenced the same first way as external hyperlink targets by using the name of the section title as URL.
Example
RST

… This can easily be done by creating a new product, see `How to create a product?`_ for additional help.  ...
HTML
… This can easily be done by creating a new product, see How to create a product? for additional help.  …

doc directive
The doc directive allows referencing a documentation page wherever it is in the file tree through a relative file path.
As usual, there are two ways to use the directive:
:doc:`path_to_doc_page` creates a hyperlink reference to the documentation page with the title of the page as label.
:doc:`label <path_to_doc_page>` creates a hyperlink reference to the documentation page with the given label.
Example
RST
Please refer to :doc:`this documentation <customer_invoices>` and to :doc:`../sales/invoicing/proforma`.
HTML
Please refer to this documentation and to Send a pro-forma invoice.
seealso directive
The seealso directive allows inserting a seealso section in a documentation page. It generally consists of a simple bulleted list of hyperlink references.
Example
RST
.. seealso::
   - :doc:`customer_invoices`
   - `Pro-forma invoices
   <../sales/invoicing/proforma.html#activate-the-feature>`_
HTML
See also:
Customer invoices
Pro-forma invoices
download directive
The download directive allows referencing files (that are not necessarily RST documents) within the source tree to be downloaded.
Example
RST
Download this :download:`module structure template <extras/my_module.zip>` to start building your module in no time.
HTML
Download this module structure template to start building your module in no time.
image directive
The image directive allows inserting images in a document. It comes with a set of optional parameter directives that can individually be omitted if considered redundant.
Example
RST
.. image:: media/create_invoice_01.png
   :align: center
   :alt: Create an invoice
   :height: 100
   :width: 200
   :scale: 50
   :class: img-thumbnail
   :target: ../invoicing.html#create-an-invoice
HTML


Alert blocks
Note
.. note::
   Use this to get the attention of the reader about additional information.
Warning
.. warning::
   Use this to require the reader to proceed with caution with what is
   described in the warning.
Danger
.. danger::
   Use this to alarm the reader about a serious threat described in the
   danger block.
Tip
.. tip::
   Use this to inform the reader about a useful trick that requires an
   action.

Formatting tips
Break the line but not the paragraph
| First super long line that you break in two…
  ...here is rendered as a single line.
| Second line that follows a line break.
Insert quotes
   Blocks of lines indented by spaces
   are rendered as quotes.
Add comments
If you made a particular choice of writing or formatting that a future writer should be able to understand and take into account, consider writing a comment. Comments are blocks of text that do not count as a part of the documentation and that are used to pass a message to writers of the source code. They consist of a line starting with two dots and a space, followed by the comment.
.. For instance, this line will not be rendered in the documentation.
Use tables
Help yourselves.
Escape markup symbols
Markup symbols escaped with backslashes ( \ ) are rendered normally. For instance, this \*\*line of text\*\* with \*markup\* symbols are rendered as “this **line of text** with *markup* symbols”.
