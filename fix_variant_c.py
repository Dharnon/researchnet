# -*- coding: utf-8 -*-
import re

with open('src/app/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix researcher data mojibake
replacements = [
    ('"Biolog\xeca Molecular"', '"Biolog\xeda Molecular"'),
    ('"F\xedsica Computacional"', '"F\xedsica Computacional"'),
    ('"Salud P\xfablica"', '"Salud P\xfablica"'),
    ('"Rob\xf3tica e IA"', '"Rob\xf3tica e IA"'),
    ('"Biom\xe9dica + CS"', '"Biom\xe9dica + CS"'),
    ('"F\xedsica Comp."', '"F\xedsica Comp."'),
    ('"Ciencias de la Computaci\xf3n"', '"Ciencias de la Computaci\xf3n"'),
    ('"Tesis Doctoral - NLP Multiling\xfce"', '"Tesis Doctoral - NLP Multiling\xfc"'),
    # Messages
    ('Cu\xe1ntame', 'Cu\xe9ntame'),
    ('ms sobre', 'm\xe1s sobre'),
    ('monitorizci\xf3n', 'monitorizaci\xf3n'),
    ('quer\xed\xeds', 'quer\xedamos'),
    ('podr\xed\xeds', 'podr\xedamos'),
    # UI strings
    ('M\xe1s informaci\xf3n', 'M\xe1s informaci\xf3n'),
    ('Con\xe9ctate', 'Con\xe9ctate'),
    ('becas, convocatorias y m\xe1s', 'becas, convocatorias y m\xe1s'),
    ('Abiertos a colaboraci\xf3n', 'Abiertos a colaboraci\xf3n'),
    ('informaci\xf3n de investigador', 'informaci\xf3n de investigador'),
    ('l\xedmite', 'l\xedmite'),
    ('Ver m\xe1s', 'Ver m\xe1s'),
    ('p\xfablico', 'p\xfablico'),
    ('pr\xf3ximo', 'pr\xf3ximo'),
    ('Empieza', 'empieza'),
    ('investigator', 'investigador'),
]

# Direct string replacements
direct_replacements = [
    ('Cu`ntame', 'Cuéntame'),
    ('ms sobre', 'más sobre'),
    ('monitorizcin', 'monitorización'),
    ('queramos', 'queríamos'),
    ('podramos', 'podríamos'),
    ('Areas', 'Áreas'),
    ('M`s informacin', 'Más información'),
    ("M\xbfs informaci\xbfn", 'Más información'),
    ("C`entate", 'Conéctate'),
    ('becas, convocatorias y ms', 'becas, convocatorias y más'),
    ('Abiertos a colaboraci`on', 'Abiertos a colaboración'),
    ('informacin de investigador', 'información de investigador'),
    ('lmite:', 'límite:'),
    ("Ver m`as", 'Ver más'),
    ('ver m`as', 'ver más'),
    ("p`ublico", 'público'),
]

for old, new in direct_replacements:
    content = content.replace(old, new)

with open('src/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
