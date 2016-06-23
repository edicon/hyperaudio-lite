import csv

# Turns a CMU Sphinx-generated set of alignment timings
# into a basic hypertranscript
#
# Assuming a timing CSV generated by JoshData's Aligner.java
# from https://github.com/JoshData/cmusphinx-alignment-example
#
# Have to add in a header row to the timings CSV:
# "word","phonemic","filler","confidence","start","end"
#
# This adds line breaks every 10 words,
# and paragraph tags around every 100 words

with open('timings.txt','rb') as csvfile:
    reader = csv.DictReader(csvfile)
    with open ('uxr101.html', 'w') as htmlfile:
        x = 0
        y = 0
        for row in reader:
            if y == 0:
                htmlfile.write('<p>')
            htmlfile.write('<a data-m="{}">{}</a> '.format(row['start'], row['word']))
            x = x + 1
            y = y + 1
            if y == 100:
                htmlfile.write('</p>\n')
                x = 0
                y = 0
            elif x == 10:
                htmlfile.write('\n')
                x = 0
