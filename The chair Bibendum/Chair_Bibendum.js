//Domains
var domainTorus = DOMAIN([[0,2*PI],[0,PI]])([50,5]);
var domainTorus2 = DOMAIN([[-PI/2,PI/2],[0,PI]])([50,5]);
var domainTorus3 = DOMAIN([[-PI/2,PI/2],[0,PI/2]])([50,2]);
var domainRack = DOMAIN([[0,2*PI],[0,PI]])([50,50]);
var dom2D = DOMAIN([[0,1],[0,1]])([72,72]);
var dom3D = DOMAIN([[0,1],[0,1],[0,1]])([30,30,1]);
var domain3 = DOMAIN([[0,1],[0,2*PI]])([10,10]);

//Torus function
var torus = function (R, r){
	return mapping = function (v) {
		var a = v[0]
		var b = v[1]

		var u = (r * COS(a) + R) * COS(b);
		var v = (r * COS(a) + R) * SIN(b);
		var w = (r * SIN(a));
		return [u,v,w];
	};
};

//Plug
var points0 = [[0,0,0],[0,3.2,0],[5.12,3.2,0],[5.12,0,0],[5.12,-3.2,0],[0,-3.2,0],[0,0,0]];
var points1 = [[0.4,0,0.8],[0.4,2.6,0.8],[4.4,2.6,0.8],[4.4,0,0.8],[4.4,-2.6,0.8],[0.4,-2.6,0.8],[0.4,0,0.8]];
var points2 = [[2.1,0,0.8]];
var curve0 = BEZIER(S0)(points0);
var curve1 = BEZIER(S0)(points1);
var curve2 = BEZIER(S0)(points2);
var cover = BEZIER(S1)([curve0,curve1,curve2]);
var plug = MAP(cover)(dom2D);


//Top Pillows
var p1_1 = T([0])([-3.5])(R([1,2])(PI/2)(EXTRUDE([2.1])(DISK(1)([50,1]))));
var p1_2 = S([0])([-1])(p1_1);
var plug1_1 = T([0,1])([2.5,-2.1])(S([0,1,2])([0.5,0.5,0.5])(R([1,2])(PI/2)(plug)));
var plug1_2 = S([0])([-1])(plug1_1);
var pillow1 = STRUCT([plug1_1,plug1_2,p1_1,p1_2,MAP(torus(3.5,1))(domainTorus)]);
var p2_1 = T([0])([-3.2])(R([1,2])(PI/2)(EXTRUDE([1.75])(DISK(1)([50,1]))));
var p2_2 = S([0])([-1])(p2_1);
var plug2_1 = T([0,1])([2.2,-1.75])(S([0,1,2])([0.5,0.5,0.5])(R([1,2])(PI/2)(plug)));
var plug2_2 = S([0])([-1])(plug2_1);
var pillow2 = T([1,2])([-0.5,-1.82])(STRUCT([plug2_1,plug2_2,p2_1,p2_2,MAP(torus(3.2,1))(domainTorus)]));

//Bottom Pillow
var outer_pillow1 = T([2])([-4])(MAP(torus(3,1))(domainTorus2));
var outer_pillow_corner1 = T([0,1,2])([2.524,-1.4,-3.99])(R([0,1])(-PI/2)(MAP(torus(0.5,0.9805))(domainTorus3)));
var outer_pillow_corner2 = S([0])([-1])(outer_pillow_corner1);
var c1 = [[1, 3.45,0],[1.28, 4.31,0],[1.56, 4.47,0],[2.49, 4.57,0]];
var c2 = [[2.49, 2.67,0],[2.49, 3.78,0],[2.49, 3.53,0],[2.49, 4.57,0]];
var c3 = [[1, 3.45,0],[1, 2.52,0],[0.79, 2.67,0],[2.49, 2.67,0]];
var c1_b = c1.map(function (p) {return [p[0],p[1],p[2]-1.96] });
var c2_b = c2.map(function (p) {return [p[0],p[1],p[2]-1.96] });
var c3_b = c3.map(function (p) {return [p[0],p[1],p[2]-1.96] });
var curve_c1 = BEZIER(S0)(c1);
var curve_c2 = BEZIER(S0)(c2);
var curve_c3 = BEZIER(S0)(c3);
var curve_c1b = BEZIER(S0)(c1_b);
var curve_c2b = BEZIER(S0)(c2_b);
var curve_c3b = BEZIER(S0)(c3_b);
var top1 = BEZIER(S1)([curve_c1,curve_c2,curve_c3]);
var top2 = BEZIER(S1)([curve_c1b,curve_c2b,curve_c3b]);
var topL = BEZIER(S2)([top1,top2]);
var surfL = MAP(topL)(dom3D);
var surfR = T([0])([4.98])(S([0])([-1])(surfL));
var surf_bottom = S([0,1])([2.04,2.6])(T([0,1,2])([-2.49,-3.41,-3.01])(STRUCT([surfL,surfR])));

var p_0 = [[0,0,0],[0,1.27,0],[1.93,1.27,0],[1.96,0,0]];
var p_1 = [[0,0,1.406],[0,1.27,1.406],[1.93,1.27,1.406],[1.96,0,1.406]];
var c_0 = BEZIER(S0)(p_0);
var c_1 = BEZIER(S0)(p_1);
var sc = BEZIER(S1)([c_0,c_1]);
var map_scR = T([0,1,2])([3.04,0.005,-3.01])(R([0,2])(PI/2)(R([1,2])(PI/2)(MAP(sc)(dom2D))));
var map_scL = S([0])([-1])(map_scR);
var p_2 = [[0,0,0],[0,1.27,0],[1.93,1.27,0],[1.96,0,0]];
var p_3 = [[0,0,5.055],[0,1.27,5.055],[1.93,1.27,5.055],[1.96,0,5.055]];
var c_2 = BEZIER(S0)(p_2);
var c_3 = BEZIER(S0)(p_3);
var scF = BEZIER(S1)([c_2,c_3]);
var map_scF = T([0,1,2])([2.53,-1.917,-3.01])(R([1,2])(PI/2)(R([0,1])(-PI/2)(R([1,2])(PI/2)(MAP(scF)(dom2D)))));

var bottom_pillow = T([1,2])([-0.8,0.35])(STRUCT([map_scF,map_scR,map_scL,surf_bottom,outer_pillow1,outer_pillow_corner1,outer_pillow_corner2]));
var pillows = COLOR([0.803,0,0])(STRUCT([bottom_pillow,pillow1,pillow2]));

//Chair Frame
var r1 = T([1,2])([-0.5,-6])(MAP(torus(2.36,0.13))(domainRack));
var pr_0 = [[0,0,-1.5],[0,0.208,-1.5],[0.3328,0.208,-1.5],[0.3328,0,-1.5],[0.3328,-0.208,-1.5],[0,-0.208,-1.5],[0,0,-1.5]];
var pr_1 = [[0,0,0],[0,0.208,0],[0.3328,0.208,0.3328],[0.3328,0,0.3328],[0.3328,-0.208,0.3328],[0,-0.208,0],[0,0,0]];
var cr_0 = BEZIER(S0)(pr_0);
var cr_1 = BEZIER(S0)(pr_1);
var mpr = BEZIER(S1)([cr_0,cr_1]);
var link1_1 = T([0,1,2])([2.36,-2,-5.8705])(R([1,2])(PI/2)(R([0,1])(-PI/2)(MAP(mpr)(dom2D))));
var link1_2 = S([0])([-1])(link1_1);
var rack1 = T([1,2])([-0.222,-0.322])(STRUCT([r1,link1_1,link1_2]));
var r2 = T([1,2])([-1.51,0.13])(MAP(torus(2.36,0.13))(domainRack));
var pr2_0 = [[0,0,-1.5],[0,0.208,-1.5],[0.3328,0.208,-1.5],[0.3328,0,-1.5],[0.3328,-0.208,-1.5],[0,-0.208,-1.5],[0,0,-1.5]];
var pr2_1 = [[0,0,0.02],[0,0.208,0.02],[0.3328,0.208,0.274],[0.3328,0,0.274],[0.3328,-0.208,0.274],[0,-0.208,0.02],[0,0,0.02]];
var cr2_0 = BEZIER(S0)(pr2_0);
var cr2_1 = BEZIER(S0)(pr2_1);
var mpr2 = BEZIER(S1)([cr2_0,cr2_1]);
var link2_1 = R([0,2])(PI)(T([0,1,2])([2.36,-3,0])(R([1,2])(PI/2)(R([0,1])(-PI/2)(MAP(mpr2)(dom2D)))));
var link2_2 = S([0])([-1])(link2_1);
var rack2 = T([1,2])([1.1,-4.881])(STRUCT([r2,link2_1,link2_2]));
var rack_link1 = T([1,2])([1.642,-6.3])(R([1,2])(-PI/16)(EXTRUDE([1.58])(DISK(0.128)([50,1]))));
var rack_link2 = T([0,1,2])([-2.4,-1.2,-4.748])(R([0,2])(PI/2)(EXTRUDE([4.75])(DISK(0.1266)([50,1]))));

var pr3_0 = [[0,0,-1.2],[0,0.208,-1.2],[0.3328,0.208,-1.5828],[0.3328,0,-1.5828],[0.3328,-0.208,-1.5828],[0,-0.208,-1.2],[0,0,-1.2]];
var pr3_1 = [[0,0,0.152],[0,0.208,0.152],[0.3328,0.208,0.422],[0.3328,0,0.422],[0.3328,-0.208,0.422],[0,-0.208,0.152],[0,0,0.152]];
var cr3_0 = BEZIER(S0)(pr3_0);
var cr3_1 = BEZIER(S0)(pr3_1);
var mpr3 = BEZIER(S1)([cr3_0,cr3_1]);
var link3_1 = T([0,1,2])([-2.36,-1.936,-5.028])(R([1,2])(-PI/16)(R([0,1])(-PI/2)(MAP(mpr3)(dom2D))));
var link3_2 = S([0])([-1])(link3_1);

var profile = BEZIER(S0)([[0,0,0],[0,0,0.1],[0.15,0,0.1],[0.15,0,0.15],[0.15,0,-0.1],[0,0,-0.1],[0,0,0]]);
var rot_mapping = ROTATIONAL_SURFACE(profile);
var rot_surface = MAP(rot_mapping)(domain3);
var rot_surface1 = T([0,1,2])([2.36,-2.17,-6.41])(rot_surface);
var rot_surface2 = S([0])([-1])(rot_surface1);
var rot_surface3 = T([0,1,2])([0,1.637,-6.41])(rot_surface);

var chair_frame = COLOR([0.882,0.929,0.811])(STRUCT([rack1,rack2,rack_link1,rack_link2,link3_1,link3_2,rot_surface1,rot_surface2,rot_surface3]));

//ArmChair
var Chair = STRUCT([pillows,chair_frame]);
DRAW(Chair);