-- HM Academy production curriculum seed: Grade 8 / Semester 1
insert into public.courses(id,title,stage,description,active) values
('grade-8-sem1','Français simple 2 — الفصل الدراسي الأول','الصف الثاني الإعدادي','المسار الأساسي للدروس التفاعلية في الفصل الدراسي الأول.',true)
on conflict(id) do update set title=excluded.title, stage=excluded.stage, description=excluded.description, active=true;

insert into public.lessons(id,course_id,title,unit_code,lesson_order,duration_minutes,xp_reward,active) values
('grade-8-u1-l1','grade-8-sem1','في المدرسة — À l''école','unit-1',1,35,100,true),
('grade-8-u1-l2','grade-8-sem1','الأدوات المدرسية والمقلمة وشنطة الظهر','unit-1',2,35,100,true),
('grade-8-u1-l3','grade-8-sem1','المواد الدراسية والتعبير عن التفضيل','unit-1',3,35,100,true),
('grade-8-u1-l4','grade-8-sem1','المهن والتعبير عن وجود الأشياء','unit-1',4,35,100,true),
('grade-8-u2-l1','grade-8-sem1','غرف المنزل وغرفة النوم','unit-2',5,35,100,true),
('grade-8-u2-l2','grade-8-sem1','غرفة المعيشة والمطبخ والحمام','unit-2',6,35,100,true),
('grade-8-u2-l3','grade-8-sem1','المفردات العامة وتصريف Avoir وÊtre','unit-2',7,35,100,true),
('grade-8-u2-l4','grade-8-sem1','حروف الجر للمكان وصفات الملكية','unit-2',8,35,100,true),
('grade-8-u3-l1','grade-8-sem1','وسائل النقل والأماكن','unit-3',9,35,100,true),
('grade-8-u3-l2','grade-8-sem1','أدوات السفر والأشخاص والتعبيرات','unit-3',10,35,100,true),
('grade-8-u3-l3','grade-8-sem1','التصريف وأسماء الإشارة','unit-3',11,35,100,true),
('grade-8-u3-l4','grade-8-sem1','حروف الجر مع المدن والدول','unit-3',12,35,100,true)
on conflict(id) do update set course_id=excluded.course_id,title=excluded.title,unit_code=excluded.unit_code,lesson_order=excluded.lesson_order,duration_minutes=excluded.duration_minutes,xp_reward=excluded.xp_reward,active=true;
